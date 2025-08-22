from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from .models import Property, PropertyImage
from .serializers import PropertySerializer, PropertyImageSerializer

class PropertyViewSet(viewsets.ModelViewSet):
    queryset = Property.objects.all().order_by("-id")
    serializer_class = PropertySerializer

class PropertyImageViewSet(viewsets.ModelViewSet):
    queryset = PropertyImage.objects.all().order_by("-id")
    serializer_class = PropertyImageSerializer
    parser_classes = [MultiPartParser, FormParser]

    def create(self, request, *args, **kwargs):
        property_id = request.data.get("property")
        if not property_id:
            return Response({"detail": "property is required"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            prop = Property.objects.get(pk=property_id)
        except Property.DoesNotExist:
            return Response({"detail": "property not found"}, status=status.HTTP_404_NOT_FOUND)

        files = request.FILES.getlist("image")
        if not files:
            # also accept "images" for convenience
            files = request.FILES.getlist("images")
        if not files:
            return Response({"detail": "No files uploaded under 'image' or 'images'."}, status=status.HTTP_400_BAD_REQUEST)

        created = []
        for f in files:
            obj = PropertyImage.objects.create(property=prop, image=f)
            created.append(obj)

        serializer = self.get_serializer(created, many=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
