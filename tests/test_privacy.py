"""Keep privacy information consistent with the deployed form integration."""
from pathlib import Path
import unittest

ROOT = Path(__file__).resolve().parents[1]

class PrivacyTests(unittest.TestCase):
    def test_formsubmit_disclosure_matches_form(self):
        home = (ROOT / 'index.html').read_text()
        privacy = (ROOT / 'gdpr.html').read_text()
        self.assertIn('https://formsubmit.co/info@pejona.sk', home)
        self.assertNotIn('Web neobsahuje formulár', privacy)
        for fragment in ['id="formsubmit"', 'https://formsubmit.co/privacy.pdf',
                         'meno a e-mail', 'IP adres', 'mimo Európskeho hospodárskeho priestoru',
                         'Lehoty uvedené v týchto zásadách', 'FormSubmit']:
            self.assertIn(fragment, privacy)
        self.assertIn('https://formsubmit.co/documentation', privacy)
        self.assertIn('30 dní', privacy)
        self.assertNotIn('neuvádza konkrétnu dobu uchovávania formulárových správ', privacy)
        self.assertIn('href="gdpr.html#formsubmit"', home)
        self.assertNotIn('nepoužíva cookies, localStorage ani sessionStorage', privacy)

if __name__ == '__main__':
    unittest.main()
