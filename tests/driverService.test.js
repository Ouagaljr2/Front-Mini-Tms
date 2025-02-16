import { fetchDrivers, searchDrivers, addDriver, updateDriver, deleteDriver } from '../services/driverService';
import api from '../services/api';

jest.mock('../services/api');

describe('driverService', () => {
    beforeAll(() => {
        jest.spyOn(console, 'error').mockImplementation(() => { });
        jest.spyOn(console, 'warn').mockImplementation(() => { });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('fetchDrivers should return an array of drivers', async () => {
        const mockDrivers = [{ id: 1, name: 'John Doe' }];
        api.get.mockResolvedValue({ data: mockDrivers });

        const result = await fetchDrivers();
        expect(api.get).toHaveBeenCalledWith('/drivers');
        expect(result).toEqual(mockDrivers);
    });

    it('fetchDrivers should return an empty array on error', async () => {
        api.get.mockRejectedValue(new Error('Network Error'));

        const result = await fetchDrivers();
        expect(result).toEqual([]);
    });

    it('searchDrivers should return filtered drivers', async () => {
        const mockDrivers = [{ id: 2, name: 'Jane Doe' }];
        api.get.mockResolvedValue({ data: mockDrivers });

        const result = await searchDrivers('Jane');
        expect(api.get).toHaveBeenCalledWith('/drivers/search?name=Jane');
        expect(result).toEqual(mockDrivers);
    });

    it('searchDrivers should return an empty array on error', async () => {
        api.get.mockRejectedValue(new Error('Network Error'));

        const result = await searchDrivers('Jane');
        expect(result).toEqual([]);
    });

    it('addDriver should return true on success', async () => {
        const mockDriver = { name: 'John Doe' };
        api.post.mockResolvedValue({ status: 200 });

        const result = await addDriver(mockDriver);
        expect(api.post).toHaveBeenCalledWith('/drivers', mockDriver);
        expect(result).toBe(true);
    });

    it('addDriver should return false on error', async () => {
        api.post.mockRejectedValue(new Error('Network Error'));

        const result = await addDriver({ name: 'John Doe' });
        expect(result).toBe(false);
    });

    it('updateDriver should return true on success', async () => {
        const mockDriver = { name: 'John Doe Updated' };
        api.put.mockResolvedValue({ status: 200 });

        const result = await updateDriver(1, mockDriver);
        expect(api.put).toHaveBeenCalledWith('/drivers/1', mockDriver);
        expect(result).toBe(true);
    });

    it('updateDriver should return false on error', async () => {
        api.put.mockRejectedValue(new Error('Network Error'));

        const result = await updateDriver(1, { name: 'John Doe Updated' });
        expect(result).toBe(false);
    });

    it('deleteDriver should return true on success', async () => {
        api.delete.mockResolvedValue({ status: 200 });

        const result = await deleteDriver(1);
        expect(api.delete).toHaveBeenCalledWith('/drivers/1');
        expect(result).toBe(true);
    });

    it('deleteDriver should return false on error', async () => {
        api.delete.mockRejectedValue(new Error('Network Error'));

        const result = await deleteDriver(1);
        expect(result).toBe(false);
    });
});
