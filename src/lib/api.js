/*
 * Copyright (c) 2026 Mahber, Inc. All rights reserved.
 * This source code is proprietary and confidential.
 * Unauthorized copying, modification, or distribution is strictly prohibited.
 */

import axios from 'axios';

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  'https://mahber-backend-production.up.railway.app/api';

// ---------------------------------------------------------------------------
// Token helpers (client-side only)
// ---------------------------------------------------------------------------

const isBrowser = typeof window !== 'undefined';

export function getToken() {
  if (!isBrowser) return null;
  return localStorage.getItem('mahber_token');
}

export function setToken(token) {
  if (!isBrowser) return;
  localStorage.setItem('mahber_token', token);
}

export function removeToken() {
  if (!isBrowser) return;
  localStorage.removeItem('mahber_token');
}

export function getRefreshToken() {
  if (!isBrowser) return null;
  return localStorage.getItem('mahber_refresh_token');
}

export function setRefreshToken(token) {
  if (!isBrowser) return;
  localStorage.setItem('mahber_refresh_token', token);
}

export function removeRefreshToken() {
  if (!isBrowser) return;
  localStorage.removeItem('mahber_refresh_token');
}

// ---------------------------------------------------------------------------
// Axios instance
// ---------------------------------------------------------------------------

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 30000,
});

// Attach bearer token to every request
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Handle 401 responses — clear stored tokens
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      removeToken();
      removeRefreshToken();
      if (isBrowser) {
        localStorage.removeItem('mahber_user');
      }
    }
    return Promise.reject(error);
  },
);

// ---------------------------------------------------------------------------
// Auth API — /auth
// ---------------------------------------------------------------------------

export const authApi = {
  register(data) {
    return api.post('/auth/register', data);
  },
  login(data) {
    return api.post('/auth/login', data);
  },
  logout() {
    return api.post('/auth/logout');
  },
  refreshToken(refreshToken) {
    return api.post('/auth/refresh', { refreshToken });
  },
  forgotPassword(email) {
    return api.post('/auth/forgot-password', { email });
  },
  verifyOtp(data) {
    return api.post('/auth/verify-otp', data);
  },
};

// ---------------------------------------------------------------------------
// Feed / Posts API — /posts
// ---------------------------------------------------------------------------

export const feedApi = {
  getPosts(params) {
    return api.get('/posts', { params });
  },
  getPost(id) {
    return api.get(`/posts/${id}`);
  },
  createPost(data) {
    return api.post('/posts', data);
  },
  updatePost(id, data) {
    return api.put(`/posts/${id}`, data);
  },
  deletePost(id) {
    return api.delete(`/posts/${id}`);
  },
  likePost(id) {
    return api.post(`/posts/${id}/like`);
  },
  unlikePost(id) {
    return api.delete(`/posts/${id}/like`);
  },
  commentOnPost(id, data) {
    return api.post(`/posts/${id}/comments`, data);
  },
  getComments(postId, params) {
    return api.get(`/posts/${postId}/comments`, { params });
  },
  deleteComment(postId, commentId) {
    return api.delete(`/posts/${postId}/comments/${commentId}`);
  },
  sharePost(id) {
    return api.post(`/posts/${id}/share`);
  },
  reportPost(id, data) {
    return api.post(`/posts/${id}/report`, data);
  },
};

// ---------------------------------------------------------------------------
// Stories API — /stories
// ---------------------------------------------------------------------------

export const storiesApi = {
  getStories(params) {
    return api.get('/stories', { params });
  },
  getStory(id) {
    return api.get(`/stories/${id}`);
  },
  createStory(data) {
    return api.post('/stories', data);
  },
  deleteStory(id) {
    return api.delete(`/stories/${id}`);
  },
  viewStory(id) {
    return api.post(`/stories/${id}/view`);
  },
};

// ---------------------------------------------------------------------------
// Jobs API — /jobs
// ---------------------------------------------------------------------------

export const jobsApi = {
  getJobs(params) {
    return api.get('/jobs', { params });
  },
  getJob(id) {
    return api.get(`/jobs/${id}`);
  },
  createJob(data) {
    return api.post('/jobs', data);
  },
  updateJob(id, data) {
    return api.put(`/jobs/${id}`, data);
  },
  deleteJob(id) {
    return api.delete(`/jobs/${id}`);
  },
  applyToJob(id, data) {
    return api.post(`/jobs/${id}/apply`, data);
  },
  getApplications(jobId) {
    return api.get(`/jobs/${jobId}/applications`);
  },
  saveJob(id) {
    return api.post(`/jobs/${id}/save`);
  },
  unsaveJob(id) {
    return api.delete(`/jobs/${id}/save`);
  },
  getSavedJobs() {
    return api.get('/jobs/saved');
  },
};

// ---------------------------------------------------------------------------
// Events API — /events
// ---------------------------------------------------------------------------

export const eventsApi = {
  getEvents(params) {
    return api.get('/events', { params });
  },
  getEvent(id) {
    return api.get(`/events/${id}`);
  },
  createEvent(data) {
    return api.post('/events', data);
  },
  updateEvent(id, data) {
    return api.put(`/events/${id}`, data);
  },
  deleteEvent(id) {
    return api.delete(`/events/${id}`);
  },
  rsvpEvent(id) {
    return api.post(`/events/${id}/rsvp`);
  },
  cancelRsvp(id) {
    return api.delete(`/events/${id}/rsvp`);
  },
};

// ---------------------------------------------------------------------------
// Housing API — /housing
// ---------------------------------------------------------------------------

export const housingApi = {
  getListings(params) {
    return api.get('/housing', { params });
  },
  getListing(id) {
    return api.get(`/housing/${id}`);
  },
  createListing(data) {
    return api.post('/housing', data);
  },
  updateListing(id, data) {
    return api.put(`/housing/${id}`, data);
  },
  deleteListing(id) {
    return api.delete(`/housing/${id}`);
  },
  contactLandlord(id, data) {
    return api.post(`/housing/${id}/contact`, data);
  },
  saveListing(id) {
    return api.post(`/housing/${id}/save`);
  },
  unsaveListing(id) {
    return api.delete(`/housing/${id}/save`);
  },
  getSavedListings() {
    return api.get('/housing/saved');
  },
};

// ---------------------------------------------------------------------------
// Community / Users API — /users
// ---------------------------------------------------------------------------

export const communityApi = {
  getProfile(userId) {
    return api.get(`/users/${userId}`);
  },
  getMyProfile() {
    return api.get('/users/me');
  },
  updateProfile(data) {
    return api.put('/users/me', data);
  },
  uploadAvatar(formData) {
    return api.post('/users/me/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  followUser(userId) {
    return api.post(`/users/${userId}/follow`);
  },
  unfollowUser(userId) {
    return api.delete(`/users/${userId}/follow`);
  },
  getFollowers(userId, params) {
    return api.get(`/users/${userId}/followers`, { params });
  },
  getFollowing(userId, params) {
    return api.get(`/users/${userId}/following`, { params });
  },
  blockUser(userId) {
    return api.post(`/users/${userId}/block`);
  },
  unblockUser(userId) {
    return api.delete(`/users/${userId}/block`);
  },
  reportUser(userId, data) {
    return api.post(`/users/${userId}/report`, data);
  },
};

// ---------------------------------------------------------------------------
// Messaging API — /messages
// ---------------------------------------------------------------------------

export const messagingApi = {
  getConversations(params) {
    return api.get('/messages', { params });
  },
  getConversation(conversationId, params) {
    return api.get(`/messages/${conversationId}`, { params });
  },
  sendMessage(conversationId, data) {
    return api.post(`/messages/${conversationId}`, data);
  },
  startConversation(data) {
    return api.post('/messages', data);
  },
  deleteMessage(conversationId, messageId) {
    return api.delete(`/messages/${conversationId}/${messageId}`);
  },
  markAsRead(conversationId) {
    return api.put(`/messages/${conversationId}/read`);
  },
};

// ---------------------------------------------------------------------------
// Dating API — /dating
// ---------------------------------------------------------------------------

export const datingApi = {
  getProfile() {
    return api.get('/dating/profile');
  },
  createProfile(data) {
    return api.post('/dating/profile', data);
  },
  updateProfile(data) {
    return api.put('/dating/profile', data);
  },
  getMatches(params) {
    return api.get('/dating/matches', { params });
  },
  getDiscover(params) {
    return api.get('/dating/discover', { params });
  },
  likeProfile(userId) {
    return api.post(`/dating/${userId}/like`);
  },
  passProfile(userId) {
    return api.post(`/dating/${userId}/pass`);
  },
  superLike(userId) {
    return api.post(`/dating/${userId}/superlike`);
  },
  unmatch(matchId) {
    return api.delete(`/dating/matches/${matchId}`);
  },
  getPreferences() {
    return api.get('/dating/preferences');
  },
  updatePreferences(data) {
    return api.put('/dating/preferences', data);
  },
};

// ---------------------------------------------------------------------------
// Marketplace API — /marketplace
// ---------------------------------------------------------------------------

export const marketplaceApi = {
  getItems(params) {
    return api.get('/marketplace', { params });
  },
  getItem(id) {
    return api.get(`/marketplace/${id}`);
  },
  createItem(data) {
    return api.post('/marketplace', data);
  },
  updateItem(id, data) {
    return api.put(`/marketplace/${id}`, data);
  },
  deleteItem(id) {
    return api.delete(`/marketplace/${id}`);
  },
};

// ---------------------------------------------------------------------------
// AI API — /ai
// ---------------------------------------------------------------------------

export const aiApi = {
  translate(data) {
    return api.post('/ai/translate', data);
  },
  generateResume(data) {
    return api.post('/ai/resume', data);
  },
  getImmigrationHelp(data) {
    return api.post('/ai/immigration', data);
  },
};

// ---------------------------------------------------------------------------
// Video API — /videos
// ---------------------------------------------------------------------------

export const videoApi = {
  getVideos(params) {
    return api.get('/videos', { params });
  },
  getVideo(id) {
    return api.get(`/videos/${id}`);
  },
  uploadVideo(formData) {
    return api.post('/videos', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 120000,
    });
  },
  updateVideo(id, data) {
    return api.put(`/videos/${id}`, data);
  },
  deleteVideo(id) {
    return api.delete(`/videos/${id}`);
  },
  likeVideo(id) {
    return api.post(`/videos/${id}/like`);
  },
  unlikeVideo(id) {
    return api.delete(`/videos/${id}/like`);
  },
  commentOnVideo(id, data) {
    return api.post(`/videos/${id}/comments`, data);
  },
  getComments(videoId, params) {
    return api.get(`/videos/${videoId}/comments`, { params });
  },
};

// ---------------------------------------------------------------------------
// Creators API — /creators
// ---------------------------------------------------------------------------

export const creatorsApi = {
  getCreators(params) {
    return api.get('/creators', { params });
  },
  getCreator(id) {
    return api.get(`/creators/${id}`);
  },
  applyAsCreator(data) {
    return api.post('/creators/apply', data);
  },
  getCreatorDashboard() {
    return api.get('/creators/dashboard');
  },
};

// ---------------------------------------------------------------------------
// Search API — /search
// ---------------------------------------------------------------------------

export const searchApi = {
  search(query, params) {
    return api.get('/search', { params: { q: query, ...params } });
  },
  searchPosts(query, params) {
    return api.get('/search/posts', { params: { q: query, ...params } });
  },
  searchUsers(query, params) {
    return api.get('/search/users', { params: { q: query, ...params } });
  },
  searchJobs(query, params) {
    return api.get('/search/jobs', { params: { q: query, ...params } });
  },
  searchEvents(query, params) {
    return api.get('/search/events', { params: { q: query, ...params } });
  },
  searchHousing(query, params) {
    return api.get('/search/housing', { params: { q: query, ...params } });
  },
};

// ---------------------------------------------------------------------------
// Remittance API — /remittance
// ---------------------------------------------------------------------------

export const remittanceApi = {
  getTransfers(params) {
    return api.get('/remittance', { params });
  },
  getTransfer(id) {
    return api.get(`/remittance/${id}`);
  },
  createTransfer(data) {
    return api.post('/remittance', data);
  },
  getExchangeRates(params) {
    return api.get('/remittance/rates', { params });
  },
  getRecipients() {
    return api.get('/remittance/recipients');
  },
  addRecipient(data) {
    return api.post('/remittance/recipients', data);
  },
  deleteRecipient(id) {
    return api.delete(`/remittance/recipients/${id}`);
  },
};

// ---------------------------------------------------------------------------
// Finance API — /finance
// ---------------------------------------------------------------------------

export const financeApi = {
  getAccounts() {
    return api.get('/finance/accounts');
  },
  getTransactions(params) {
    return api.get('/finance/transactions', { params });
  },
  getBalance() {
    return api.get('/finance/balance');
  },
};

// ---------------------------------------------------------------------------
// Streaming API — /streaming
// ---------------------------------------------------------------------------

export const streamingApi = {
  getStreams(params) {
    return api.get('/streaming', { params });
  },
  getStream(id) {
    return api.get(`/streaming/${id}`);
  },
  startStream(data) {
    return api.post('/streaming', data);
  },
  endStream(id) {
    return api.put(`/streaming/${id}/end`);
  },
};

// ---------------------------------------------------------------------------
// Notifications API — /notifications
// ---------------------------------------------------------------------------

export const notificationsApi = {
  getNotifications(params) {
    return api.get('/notifications', { params });
  },
  markAsRead(id) {
    return api.put(`/notifications/${id}/read`);
  },
  markAllAsRead() {
    return api.put('/notifications/read-all');
  },
  getUnreadCount() {
    return api.get('/notifications/unread-count');
  },
  updatePreferences(data) {
    return api.put('/notifications/preferences', data);
  },
};

// ---------------------------------------------------------------------------
// Admin API — /admin
// ---------------------------------------------------------------------------

export const adminApi = {
  getDashboard() {
    return api.get('/admin/dashboard');
  },
  getUsers(params) {
    return api.get('/admin/users', { params });
  },
  updateUser(id, data) {
    return api.put(`/admin/users/${id}`, data);
  },
  banUser(id) {
    return api.post(`/admin/users/${id}/ban`);
  },
  unbanUser(id) {
    return api.delete(`/admin/users/${id}/ban`);
  },
  getReports(params) {
    return api.get('/admin/reports', { params });
  },
  resolveReport(id, data) {
    return api.put(`/admin/reports/${id}`, data);
  },
};

export default api;
