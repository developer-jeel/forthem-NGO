from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase
from django.urls import reverse

from .models import Banner, HomePageContent


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


class BannerEditTests(TestCase):
    def test_content_manager_can_update_banner(self):
        banner = Banner.objects.create(
            page='about',
            title='Old title',
            image=SimpleUploadedFile('old.png', b'old-data', content_type='image/png'),
            content='Old text',
            is_active=True,
        )

        response = self.client.post(
            reverse('content_managerr:edit_banner', args=[banner.id]),
            {
                'page': 'about',
                'title': 'Updated title',
                'content': 'Updated text',
                'is_active': 'on',
            }
        )

        self.assertEqual(response.status_code, 302)
        banner.refresh_from_db()
        self.assertEqual(banner.title, 'Updated title')
        self.assertEqual(banner.content, 'Updated text')
        self.assertTrue(banner.is_active)


class HomePageContentTests(TestCase):
    def test_content_manager_can_update_homepage_content(self):
        response = self.client.post(
            reverse('content_managerr:homepage_content'),
            {
                'hero_heading': 'Updated homepage heading',
                'hero_subheading': 'Updated homepage description',
                'primary_cta_label': 'Give Now',
                'primary_cta_url': '/donate',
                'secondary_cta_label': 'Adopt Today',
                'secondary_cta_url': '/adopt',
                'stats_visible': 'on',
                'stat1_number': '100+',
                'stat1_label': 'Animals helped',
                'stat2_number': '200+',
                'stat2_label': 'Trees planted',
                'stat3_number': '300+',
                'stat3_label': 'Volunteers',
                'stat4_number': '4',
                'stat4_label': 'Cities',
                'featured_campaigns_visible': 'on',
                'featured_campaigns_heading': 'Support our campaigns',
            },
        )

        self.assertRedirects(response, reverse('content_managerr:homepage_content'))
        content = HomePageContent.objects.get(pk=1)
        self.assertEqual(content.hero_heading, 'Updated homepage heading')
        self.assertEqual(content.primary_cta_label, 'Give Now')
        self.assertEqual(content.stat4_label, 'Cities')
