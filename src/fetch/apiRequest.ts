export async function apiRequest<T>(url: string, options: RequestInit = {}): Promise<T> {
    const headers = new Headers(options.headers);

    if (options.body !== undefined && !headers.has("Content-Type")) {
        headers.set("Content-Type", "application/json");
    }

    const response = await fetch(url, { ...options, headers });

    if (!response.ok) {
        let message = response.statusText;
        const responseBody = await response.text().catch(() => "");

        if (responseBody) {
            try {
                const errorBody: unknown = JSON.parse(responseBody);
                if (typeof errorBody === "object" && errorBody !== null) {
                    const details = errorBody as { mensagem?: unknown; message?: unknown; erro?: unknown };
                    const apiMessage = details.mensagem ?? details.message ?? details.erro;
                    if (typeof apiMessage === "string") message = apiMessage;
                } else {
                    message = responseBody;
                }
            } catch {
                message = responseBody;
            }
        }

        throw new Error(`Erro ${response.status}: ${message}`);
    }

    if (response.status === 204) return undefined as T;
    return response.json() as Promise<T>;
}