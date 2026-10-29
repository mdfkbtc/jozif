"""Static SEO regression checks. Run: python -m unittest discover -s tests -v"""
import json
from html.parser import HTMLParser
from pathlib import Path
import unittest

ROOT = Path(__file__).resolve().parents[1]
BASE = 'https://www.pejona.sk'

class Page(HTMLParser):
    def __init__(self, path):
        super().__init__()
        self.tags = []
        self.feed(path.read_text())
    def handle_starttag(self, tag, attrs):
        self.tags.append((tag, dict(attrs)))
    def find(self, tag, **attrs):
        return [a for t, a in self.tags if t == tag and all(a.get(k) == v for k, v in attrs.items())]

class SeoTests(unittest.TestCase):
    def test_page_metadata_and_canonical(self):
        descriptions = []
        for name, suffix in [('index.html', '/'), ('gdpr.html', '/gdpr.html')]:
            with self.subTest(page=name):
                page = Page(ROOT / name)
                url = BASE + suffix
                self.assertEqual(page.find('link', rel='canonical'), [{'rel': 'canonical', 'href': url}])
                for prop in ['og:title', 'og:description', 'og:image', 'og:url', 'og:locale', 'og:type']:
                    self.assertTrue(page.find('meta', property=prop), prop)
                self.assertEqual(page.find('meta', property='og:url')[0]['content'], url)
                image = page.find('meta', property='og:image')[0]['content']
                self.assertTrue(image.startswith(BASE + '/'))
                self.assertTrue((ROOT / image.removeprefix(BASE + '/')).is_file())
                descriptions.append(page.find('meta', name='description')[0]['content'])
                for a in page.find('a'):
                    self.assertNotIn('*', a.get('href', ''))
        self.assertEqual(len(set(descriptions)), 2)
        home = (ROOT / 'index.html').read_text()
        self.assertIn('Upratovanie v Žiline', home.split('<h1>')[1].split('</h1>')[0])
        self.assertIn('href="assets/hero-woman-office.webp" type="image/webp"', home)

    def test_crawl_discovery(self):
        import xml.etree.ElementTree as ET
        import urllib.robotparser
        robot = urllib.robotparser.RobotFileParser()
        text = (ROOT / 'robots.txt').read_text()
        robot.parse(text.splitlines())
        self.assertTrue(robot.can_fetch('Googlebot', BASE + '/'))
        self.assertIn(BASE + '/sitemap.xml', (robot.site_maps() or []))
        tree = ET.parse(ROOT / 'sitemap.xml')
        urls = [x.text for x in tree.findall('.//{http://www.sitemaps.org/schemas/sitemap/0.9}loc')]
        self.assertEqual(set(urls), {BASE + '/', BASE + '/gdpr.html'})
        self.assertEqual(len(urls), len(set(urls)))
        self.assertIn(BASE + '/', (ROOT / 'llms.txt').read_text())

    def test_linked_structured_data(self):
        import re
        html = (ROOT / 'index.html').read_text()
        match = re.search(r'<script type="application/ld\+json">(.*?)</script>', html, re.S)
        assert match is not None
        data = json.loads(match.group(1))
        graph = data.get('@graph', [])
        business = next((x for x in graph if x['@type'] == 'LocalBusiness'), None)
        self.assertIsNotNone(business, 'LocalBusiness must belong to a linked graph')
        assert business is not None
        site = next(x for x in graph if x['@type'] == 'WebSite')
        self.assertEqual(site['publisher']['@id'], business['@id'])
        self.assertEqual(business['url'], BASE + '/')
        self.assertEqual(business['address']['addressLocality'], 'Žilina')
        self.assertEqual(site['url'], BASE + '/')
        for entity in graph:
            self.assertNotIn('aggregateRating', entity)

if __name__ == '__main__':
    unittest.main()
