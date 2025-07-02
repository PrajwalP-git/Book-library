from rest_framework import serializers
from . models import Book

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model= Book
        fields= '__all__'

    def validate_title(self, value):
        if len(value.strip())<3 or not re.search(r'[aeiouAEIOU]',value):
            raise serializers.ValidationError('Title seems invalid or too short')
        return value
    
    def validate_author(self, value):
        if len(value.strip())<3 or not re.search(r'[aeiouAEIOU]',value):
            raise serializers.ValidationError('Author name seems invalid or too short.')
        return value
    
    def validate_genre(self, value):
        if len(value.strip())<3 or not re.search(r'[aeiouAEIOU]', value):
            raise serializers.ValidationError('Genre seems invalid or too short')
        return value
    
    def validate_published_date(Self, value):
        if value > datetime.now().date():
            raise serializers.ValidationError('Published date cannot be in future.')
        return value
