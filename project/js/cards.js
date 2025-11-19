const cardsContainer = document.querySelector(".cardsContainer")
const imageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4XYC_5HYOYpsgDOTOf-8Hi--2ThYeictydQ&s'

async function fetchCards() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) throw new Error('Ошибка при загрузке данных');
        
        const data = await response.json();

        data.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <img src="${imageUrl}" alt="Card Image">
                <h4>${item.title}</h4>
                <h5>${item.body}</h5>
            `;
            cardsContainer.appendChild(card);
        });

    } catch (error) {
        console.error('Ошибка при получении карточек:', error);
        cardsContainer.innerHTML = `<p>Не удалось загрузить карточки.</p>`;
    }
}

fetchCards();
