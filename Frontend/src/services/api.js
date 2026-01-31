const API_BASE_URL = import.meta.env.VITE_API_URL;

export const fetchCertificates = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/certificates`);
    if (!response.ok) throw new Error('Failed to fetch certificates');
    return await response.json();
  } catch (error) {
    console.error('Error fetching certificates:', error);
    throw error;
  }
};

export const createCertificate = async (data) => {
  const response = await fetch(`${API_BASE_URL}/api/certificates`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return await response.json();
};

export const updateCertificate = async (id, data) => {
  const response = await fetch(`${API_BASE_URL}/api/certificates/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return await response.json();
};

export const deleteCertificate = async (id) => {
  const response = await fetch(`${API_BASE_URL}/api/certificates/${id}`, { method: 'DELETE' });
  return await response.json();
};

export const fetchProjects = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/projects`);
    if (!response.ok) throw new Error('Failed to fetch projects');
    return await response.json();
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

export const createProject = async (data) => {
  const response = await fetch(`${API_BASE_URL}/api/projects`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return await response.json();
};

export const updateProject = async (id, data) => {
  const response = await fetch(`${API_BASE_URL}/api/projects/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return await response.json();
};

export const deleteProject = async (id) => {
  const response = await fetch(`${API_BASE_URL}/api/projects/${id}`, { method: 'DELETE' });
  return await response.json();
};

export const fetchExperiences = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/experiences`);
    if (!response.ok) throw new Error('Failed to fetch experiences');
    return await response.json();
  } catch (error) {
    console.error('Error fetching experiences:', error);
    throw error;
  }
};

export const createExperience = async (data) => {
  const response = await fetch(`${API_BASE_URL}/api/experiences`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return await response.json();
};

export const updateExperience = async (id, data) => {
  const response = await fetch(`${API_BASE_URL}/api/experiences/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return await response.json();
};

export const deleteExperience = async (id) => {
  const response = await fetch(`${API_BASE_URL}/api/experiences/${id}`, { method: 'DELETE' });
  return await response.json();
};

export const adminLogin = async (username, password) => {
  const response = await fetch(`${API_BASE_URL}/api/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  return await response.json();
};

export const changePassword = async (username, oldPassword, newPassword) => {
  const response = await fetch(`${API_BASE_URL}/api/admin/change-password`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, oldPassword, newPassword })
  });
  return await response.json();
};

export const fetchProfile = async () => {
  const response = await fetch(`${API_BASE_URL}/api/profile`);
  return await response.json();
};

export const updateProfile = async (data) => {
  const response = await fetch(`${API_BASE_URL}/api/profile`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return await response.json();
};

export const fetchEducation = async () => {
  const response = await fetch(`${API_BASE_URL}/api/education`);
  return await response.json();
};

export const createEducation = async (data) => {
  const response = await fetch(`${API_BASE_URL}/api/education`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return await response.json();
};

export const updateEducation = async (id, data) => {
  const response = await fetch(`${API_BASE_URL}/api/education/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return await response.json();
};

export const deleteEducation = async (id) => {
  const response = await fetch(`${API_BASE_URL}/api/education/${id}`, { method: 'DELETE' });
  return await response.json();
};

export const uploadProfileImage = async (formData) => {
  const response = await fetch(`${API_BASE_URL}/api/profile/image`, {
    method: 'POST',
    body: formData
  });
  return await response.json();
};

export const fetchProfileImage = async () => {
  const response = await fetch(`${API_BASE_URL}/api/profile/image`);
  return await response.json();
};

export const uploadHomeImage = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/profile/upload-home-image`, {
      method: 'POST',
      body: formData
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Upload home image error:', error);
    throw error;
  }
};

export const uploadAboutImage = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/profile/upload-about-image`, {
      method: 'POST',
      body: formData
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Upload about image error:', error);
    throw error;
  }
};
