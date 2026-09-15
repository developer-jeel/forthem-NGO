from django.contrib import admin

from .models import Banner


@admin.register(Banner)
class BannerAdmin(admin.ModelAdmin):
	list_display = ('page', 'title', 'is_active', 'created_at', 'updated_at')
	list_filter = ('page', 'is_active')
	search_fields = ('title',)
