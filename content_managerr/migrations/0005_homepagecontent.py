from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('content_managerr', '0004_remove_banner_link_banner_content_alter_banner_page'),
    ]

    operations = [
        migrations.CreateModel(
            name='HomePageContent',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('hero_heading', models.CharField(default='Every Life Deserves Care and Purpose.', max_length=200)),
                ('hero_subheading', models.TextField(default='Unke Liye rescues, protects, and advocates for animals, communities, and the environment across India.')),
                ('primary_cta_label', models.CharField(default='Donate Today', max_length=80)),
                ('primary_cta_url', models.CharField(default='/donate', max_length=200)),
                ('secondary_cta_label', models.CharField(default='Report an Animal', max_length=80)),
                ('secondary_cta_url', models.CharField(default='/report-animal', max_length=200)),
                ('stats_visible', models.BooleanField(default=True)),
                ('stat1_number', models.CharField(default='4,200+', max_length=40)),
                ('stat1_label', models.CharField(default='Animals Rescued', max_length=80)),
                ('stat2_number', models.CharField(default='2.8Cr', max_length=40)),
                ('stat2_label', models.CharField(default='Funds Raised', max_length=80)),
                ('stat3_number', models.CharField(default='840+', max_length=40)),
                ('stat3_label', models.CharField(default='Active Volunteers', max_length=80)),
                ('stat4_number', models.CharField(default='24', max_length=40)),
                ('stat4_label', models.CharField(default='Cities Covered', max_length=80)),
                ('featured_campaigns_visible', models.BooleanField(default=True)),
                ('featured_campaigns_heading', models.CharField(default='Campaigns Urgently Needing Support', max_length=200)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
        ),
    ]
