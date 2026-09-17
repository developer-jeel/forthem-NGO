from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase
from django.urls import reverse

from content_managerr.models import Banner


class BannerRenderingTests(TestCase):
    def test_public_pages_pass_banner_context_from_model(self):
        banner_map = {
            'campaigns': 'campaigns',
            'stories': 'stories',
            'volunteer': 'volunteer',
            'impact': 'impact',
            'transparency': 'transparency',
            'privacy_policy': 'privacy_policy',
            'sitemap': 'sitemap',
            'work_animal_rescue': 'work_animal_rescue',
            'work_disaster_relief': 'work_disaster_relief',
            'work_sanitation': 'work_sanitation',
        }

        for page, title in banner_map.items():
            Banner.objects.create(
                page=page,
                title=title,
                image=SimpleUploadedFile(f'{page}.png', b'fake-image-data', content_type='image/png'),
                is_active=True,
            )

        for url_name in banner_map:
            response = self.client.get(reverse(f'public:{url_name}'))
            self.assertEqual(response.status_code, 200)
            self.assertIn(f'{url_name}_banner', response.context)
            self.assertIsNotNone(response.context[f'{url_name}_banner'])
