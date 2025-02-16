import AsyncStorage from '@react-native-async-storage/async-storage';
import { createUser, loginUser, getUserInfo, logoutUser, isAuthenticated } from '../services/userService';
import api from '../services/api';

jest.mock('../services/api');
jest.mock('@react-native-async-storage/async-storage');

describe('userService', () => {
    beforeAll(() => {
        jest.spyOn(console, 'log').mockImplementation(() => { }); // Supprime les logs
        jest.spyOn(console, 'error').mockImplementation(() => { }); // Supprime les erreurs
        jest.spyOn(console, 'warn').mockImplementation(() => { }); // Supprime les avertissements
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('createUser should return user data on success', async () => {
        const mockUser = { username: 'john_doe', role: 'Admin' };
        api.post.mockResolvedValue({ data: mockUser });

        const result = await createUser(mockUser);
        expect(api.post).toHaveBeenCalledWith('/users/register', mockUser);
        expect(result).toEqual(mockUser);
    });

    it('createUser should return error on failure', async () => {
        const mockError = { error: 'Username already exists' };
        api.post.mockRejectedValue({ response: { status: 400, data: mockError } });

        const result = await createUser({ username: 'john_doe', role: 'Admin' });
        expect(result).toEqual(mockError);  // Vérifie que la structure correspond à ce que tu attends
    });

    it('loginUser should return true on success', async () => {
        api.post.mockResolvedValue({ status: 200, data: true });
        AsyncStorage.setItem.mockResolvedValue();

        const result = await loginUser('john_doe', 'password');
        expect(api.post).toHaveBeenCalledWith('/users/login', { username: 'john_doe', password: 'password' });
        expect(AsyncStorage.setItem).toHaveBeenCalledWith('username', 'john_doe');
        expect(result).toBe(true);
    });

    it('loginUser should return false on failure', async () => {
        api.post.mockResolvedValue({ status: 400, data: false });

        const result = await loginUser('john_doe', 'password');
        expect(result).toBe(false);
    });

    it('getUserInfo should return user info on success', async () => {
        const mockUser = { username: 'john_doe', role: 'Admin' };
        AsyncStorage.getItem.mockResolvedValue('john_doe');
        api.get.mockResolvedValue({ data: mockUser });

        const result = await getUserInfo();
        expect(api.get).toHaveBeenCalledWith('/users/getUser', { params: { username: 'john_doe' } });
        expect(result).toEqual(mockUser);
    });

    it('getUserInfo should return null on error', async () => {
        AsyncStorage.getItem.mockResolvedValue(null);

        const result = await getUserInfo();
        expect(result).toBeNull();
    });

    it('logoutUser should remove username from AsyncStorage', async () => {
        AsyncStorage.removeItem.mockResolvedValue();

        await logoutUser();
        expect(AsyncStorage.removeItem).toHaveBeenCalledWith('username');
    });

    it('isAuthenticated should return true if username exists', async () => {
        AsyncStorage.getItem.mockResolvedValue('john_doe');

        const result = await isAuthenticated();
        expect(result).toBe(true);
    });

    it('isAuthenticated should return false if username does not exist', async () => {
        AsyncStorage.getItem.mockResolvedValue(null);

        const result = await isAuthenticated();
        expect(result).toBe(false);
    });
});
