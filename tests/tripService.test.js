import { fetchTrips, searchTrips, addTrip, updateTrip, deleteTrip } from '../services/tripService';
import api from '../services/api';

jest.mock('../services/api');

describe('tripService', () => {
    beforeAll(() => {
        jest.spyOn(console, 'error').mockImplementation(() => { });
        jest.spyOn(console, 'warn').mockImplementation(() => { });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('fetchTrips should return an array of trips', async () => {
        const mockTrips = [{ id: 1, origin: 'Paris', destination: 'Lyon' }];
        api.get.mockResolvedValue({ data: mockTrips });

        const result = await fetchTrips();
        expect(api.get).toHaveBeenCalledWith('/trips');
        expect(result).toEqual(mockTrips);
    });

    it('fetchTrips should return an empty array on error', async () => {
        api.get.mockRejectedValue(new Error('Network Error'));

        const result = await fetchTrips();
        expect(result).toEqual([]);
    });

    it('searchTrips should return filtered trips', async () => {
        const mockTrips = [{ id: 2, origin: 'Lyon', destination: 'Marseille' }];
        api.get.mockResolvedValue({ data: mockTrips });

        const result = await searchTrips('Lyon', 'Marseille');
        expect(api.get).toHaveBeenCalledWith('/trips/search?origin=Lyon&destination=Marseille');
        expect(result).toEqual(mockTrips);
    });

    it('searchTrips should return an empty array on error', async () => {
        api.get.mockRejectedValue(new Error('Network Error'));

        const result = await searchTrips('Lyon', 'Marseille');
        expect(result).toEqual([]);
    });

    it('addTrip should return true on success', async () => {
        const mockTrip = { origin: 'Paris', destination: 'Lyon' };
        api.post.mockResolvedValue({ status: 200 });

        const result = await addTrip(mockTrip, 1, 2);
        expect(api.post).toHaveBeenCalledWith('/trips?driverId=1&vehicleId=2', mockTrip);
        expect(result).toBe(true);
    });

    it('addTrip should return false on error', async () => {
        api.post.mockRejectedValue(new Error('Network Error'));

        const result = await addTrip({ origin: 'Paris', destination: 'Lyon' }, 1, 2);
        expect(result).toBe(false);
    });

    it('updateTrip should return true on success', async () => {
        const mockTrip = { origin: 'Paris', destination: 'Lyon' };
        api.put.mockResolvedValue({ status: 200 });

        const result = await updateTrip(1, mockTrip);
        expect(api.put).toHaveBeenCalledWith('/trips/1', mockTrip);
        expect(result).toBe(true);
    });

    it('updateTrip should return false on error', async () => {
        api.put.mockRejectedValue(new Error('Network Error'));

        const result = await updateTrip(1, { origin: 'Paris', destination: 'Lyon' });
        expect(result).toBe(false);
    });

    it('deleteTrip should return true on success', async () => {
        api.delete.mockResolvedValue({ status: 200 });

        const result = await deleteTrip(1);
        expect(api.delete).toHaveBeenCalledWith('/trips/1');
        expect(result).toBe(true);
    });

    it('deleteTrip should return false on error', async () => {
        api.delete.mockRejectedValue(new Error('Network Error'));

        const result = await deleteTrip(1);
        expect(result).toBe(false);
    });
});
