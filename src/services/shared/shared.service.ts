export async function fetchData<T>(url: string): Promise<T> {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch from ${url}`);
    }
    const data: T = await response.json();
    return data;
}

export async function postData<T>(url: string, data: T): Promise<T> {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error(`Failed to post to ${url}`);
    }
    const responseData: T = await response.json();
    return responseData;
}

export async function putData<T>(url: string, data: T, id: string | number): Promise<T> {
    const response = await fetch(`${url}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error(`Failed to put to ${url}`);
    }
    const responseData: T = await response.json();
    return responseData;
}

export async function patchData<T>(url: string, data: T, id: string | number): Promise<T> {
    const response = await fetch(`${url}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error(`Failed to put to ${url}`);
    }
    const responseData: T = await response.json();
    return responseData;
}

export async function deleteData(url: string, id: string | number): Promise<void> {
    const response = await fetch(`${url}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error(`Failed to delete from ${url}`);
    }
}

export async function asJsonResponse(response: Response): Promise<any> {
    return response.json();
  }