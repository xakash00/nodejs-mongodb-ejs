console.log("Ajs")

async function createBlog(event: Event, formId: string, titleId: string, contentId: string, redirectUrl: string = '/') {
    event.preventDefault();

    const titleInput = document.getElementById('title') as HTMLInputElement | null;
    const contentInput = document.getElementById('content') as HTMLInputElement | null;
    const authorInput = document.getElementById('author') as HTMLInputElement | null;

    const title = titleInput.value;
    const content = contentInput.value;
    const author = authorInput.value;

    if (!titleInput || !contentInput) {
        console.error('Form inputs not found');
        return;
    }


    try {
        const response = await fetch(formId === 'createForm' ? '/create' : '/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, content, author })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        window.location.href = redirectUrl;
    } catch (error) {
        console.error('Error submitting form:', error);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    window.createBlog = createBlog;
});
