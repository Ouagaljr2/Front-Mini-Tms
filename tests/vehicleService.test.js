const { fetchVehicles, searchVehicles, addVehicle, updateVehicle, deleteVehicle } = require('../services/vehicleService');
const api = require('../services/api');

jest.mock('../services/api', () => ({
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
}));

const mockVehicles = [{ id: 1, registration: 'AB-123-CD' }];
const mockVehicle = { registration: 'AB-123-CD' };
const mockSearchResult = [{ id: 2, registration: 'XY-456-ZW' }];
const networkError = new Error('Network Error');

describe('vehicleService', () => {
    beforeAll(() => {
        jest.spyOn(console, 'error').mockImplementation(() => { });
        jest.spyOn(console, 'warn').mockImplementation(() => { });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('fetchVehicles should return an array of vehicles', async () => {
        api.get.mockResolvedValue({ data: mockVehicles });

        const result = await fetchVehicles();
        expect(api.get).toHaveBeenCalledWith('/vehicles');
        expect(result).toEqual(mockVehicles);
    });

    it('fetchVehicles should return an empty array on error', async () => {
        api.get.mockRejectedValue(networkError);

        const result = await fetchVehicles();
        expect(result).toEqual([]);
    });

    it('searchVehicles should return filtered vehicles', async () => {
        api.get.mockResolvedValue({ data: mockSearchResult });

        const result = await searchVehicles('XY');
        expect(api.get).toHaveBeenCalledWith('/vehicles/search', { params: { registrationNumber: 'XY' } });
        expect(result).toEqual(mockSearchResult);
    });

    it('searchVehicles should return an empty array on error', async () => {
        api.get.mockRejectedValue(networkError);

        const result = await searchVehicles('XY');
        expect(result).toEqual([]);
    });

    it('addVehicle should return vehicle data on success', async () => {
        api.post.mockResolvedValue({ status: 200, data: mockVehicle });

        const result = await addVehicle(mockVehicle);
        expect(api.post).toHaveBeenCalledWith('/vehicles', mockVehicle);
        expect(result).toEqual(mockVehicle);
    });

    it('addVehicle should return null on error', async () => {
        api.post.mockRejectedValue(networkError);

        const result = await addVehicle(mockVehicle);
        expect(result).toBeNull();
    });

    it('updateVehicle should return vehicle data on success', async () => {
        api.put.mockResolvedValue({ status: 200, data: mockVehicle });

        const result = await updateVehicle(1, mockVehicle);
        expect(api.put).toHaveBeenCalledWith('/vehicles/1', mockVehicle);
        expect(result).toEqual(mockVehicle);
    });

    it('updateVehicle should return null on error', async () => {
        api.put.mockRejectedValue(networkError);

        const result = await updateVehicle(1, mockVehicle);
        expect(result).toBeNull();
    });

    it('deleteVehicle should return true on success', async () => {
        api.delete.mockResolvedValue({ status: 200 });

        const result = await deleteVehicle(1);
        expect(api.delete).toHaveBeenCalledWith('/vehicles/1');
        expect(result).toBe(true);
    });

    it('deleteVehicle should return false on error', async () => {
        api.delete.mockRejectedValue(networkError);

        const result = await deleteVehicle(1);
        expect(result).toBe(false);
    });
});
