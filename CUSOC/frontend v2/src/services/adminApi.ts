import api from './api';

// ── Admin API ────────────────────────────────────────────────────────────────
export const loginAdmin = (username: string, password: string) => 
    api.post('/admin/login', { username, password });

export const fetchRegistrations = (token: string) => 
    api.get('/admin/registrations', { 
        headers: { Authorization: `Bearer ${token}` } 
    });

export const updateBookingStatus = (token: string, userId: string, status: string) => 
    api.patch(`/admin/registration/${userId}`, { status }, { 
        headers: { Authorization: `Bearer ${token}` } 
    });

export const exportToExcel = (token: string) => 
    api.get('/admin/export-excel', { 
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob' 
    });

export const updateEventSettings = (token: string, settings: any) => 
    api.post('/admin/event-settings', settings, { 
        headers: { Authorization: `Bearer ${token}` } 
    });

export default {
    loginAdmin,
    fetchRegistrations,
    updateBookingStatus,
    exportToExcel,
    updateEventSettings
};
