from django.test import TestCase

from .models import Banner


class BannerPageChoicesTests(TestCase):
    def test_public_pages_are_available_as_banner_pages(self):
        page_names = {choice[0] for choice in Banner.PAGE_CHOICES}

        required_pages = {
            'home',
            'about',
            'adopt',
            'donate',
            'rescue',
            'environment',
            'contact',
            'faq',
            'campaigns',
            'stories',
            'volunteer',
            'impact',
            'transparency',
            'privacy_policy',
            'terms',
            'sitemap',
            'work_animal_rescue',
            'work_disaster_relief',
            'work_sanitation',
        }

        self.assertTrue(required_pages.issubset(page_names))
