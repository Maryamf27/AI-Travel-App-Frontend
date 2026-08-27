import { hotelApi } from '@/lib/api';

export const searchHotels = (data) => hotelApi.searchHotels(data);

export const getMyHotelSearches = () => hotelApi.getMyHotelSearches();

export const getHotelSearchById = (id) => hotelApi.getHotelSearchById(id);

export const deleteHotelSearch = (id) => hotelApi.deleteHotelSearch(id);
