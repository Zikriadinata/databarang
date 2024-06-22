document.addEventListener('DOMContentLoaded', () => {
    const itemForm = document.getElementById('item-form');
    const itemList = document.getElementById('item-list');
    const searchInput = document.getElementById('search');

    let items = JSON.parse(localStorage.getItem('items')) || [];

    function saveItems() {
        localStorage.setItem('items', JSON.stringify(items));
    }

    function renderItems() {
        itemList.innerHTML = '';
        const sortedItems = items.sort((a, b) => a.itemName.localeCompare(b.itemName));
        sortedItems.forEach((item, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${item.storeName}</td>
                <td>${item.itemName}</td>
                <td>Rp${item.itemPrice}</td>
                <td class="item-actions">
                    <button class="edit-btn" data-index="${index}">Edit</button>
                    <button class="delete-btn" data-index="${index}">Hapus</button>
                </td>
            `;
            itemList.appendChild(tr);
        });

        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                editItem(index);
            });
        });

        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                deleteItem(index);
            });
        });
    }

    function addItem(item) {
        items.push(item);
        saveItems();
        renderItems();
    }

    function editItem(index) {
        const item = items[index];
        document.getElementById('item-id').value = index;
        document.getElementById('store-name').value = item.storeName;
        document.getElementById('item-name').value = item.itemName;
        document.getElementById('item-price').value = item.itemPrice;
    }

    function updateItem(index, updatedItem) {
        items[index] = updatedItem;
        saveItems();
        renderItems();
    }

    function deleteItem(index) {
        items.splice(index, 1);
        saveItems();
        renderItems();
    }

    itemForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const itemId = document.getElementById('item-id').value;
        const storeName = document.getElementById('store-name').value;
        const itemName = document.getElementById('item-name').value;
        const itemPrice = document.getElementById('item-price').value;
        const item = { storeName, itemName, itemPrice };

        if (itemId === '') {
            addItem(item);
        } else {
            updateItem(itemId, item);
        }

        itemForm.reset();
        document.getElementById('item-id').value = '';
    });

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredItems = items.filter(item =>
            item.storeName.toLowerCase().includes(searchTerm) ||
            item.itemName.toLowerCase().includes(searchTerm)
        );
        itemList.innerHTML = '';
        filteredItems.forEach((item, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${item.storeName}</td>
                <td>${item.itemName}</td>
                <td>Rp${item.itemPrice}</td>
                <td class="item-actions">
                    <button class="edit-btn" data-index="${index}">Edit</button>
                    <button class="delete-btn" data-index="${index}">Hapus</button>
                </td>
            `;
            itemList.appendChild(tr);
        });

        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                editItem(index);
            });
        });

        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                deleteItem(index);
            });
        });
    });

    renderItems();
});
