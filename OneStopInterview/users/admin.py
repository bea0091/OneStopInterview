from django.contrib import admin
from .models import User
from django.db import models
from django.contrib.auth.admin import UserAdmin
from django.forms import Textarea


class UserAdminConfig(UserAdmin):
    model = User
    ordering = ('-start_date',)
    list_display = ('id', 'email', 'user_name', 'first_name', 'last_name',
                    'progress_percentage', 'is_active', 'is_staff')
    search_fields = ('email', 'user_name', 'first_name', 'last_name', 'progress_percentage')
    list_filter = ('email', 'user_name', 'first_name', 'is_active', 'is_staff')

    fieldsets = (
        (None, {'fields': ('email', 'user_name', 'first_name', 'last_name', 'progress_percentage')}),
        ('Permissions', {'fields': ('is_staff', 'is_active')}),
        ('Personal', {'fields': ('about',)}),
    )
    formfield_overrides = {
        models.TextField: {'widget': Textarea(attrs={'rows': 20, 'cols': 60})},
    }
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'user_name', 'first_name', 'last_name', 'user_progress',
                       'password1', 'password2', 'is_active', 'is_staff')}
         ),
    )


admin.site.register(User, UserAdminConfig)
