{\rtf1\ansi\ansicpg1252\cocoartf2709
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 document.addEventListener('DOMContentLoaded', () => \{\
    const API_URL = 'http://127.0.0.1:8000/api/rentals/';\
    \
    const rentalsTableBody = document.getElementById('rentals-table').getElementsByTagName('tbody')[0];\
    const searchInput = document.getElementById('search');\
    const addRentalForm = document.getElementById('add-rental-form');\
\
    // Fetch and display rentals\
    function fetchRentals() \{\
        fetch(API_URL)\
            .then(response => response.json())\
            .then(data => \{\
                rentalsTableBody.innerHTML = '';\
                data.forEach(rental => \{\
                    const row = rentalsTableBody.insertRow();\
                    row.insertCell(0).innerText = rental.model_name;\
                    row.insertCell(1).innerText = rental.weight;\
                    row.insertCell(2).innerText = rental.category;\
                    row.insertCell(3).innerText = rental.brand;\
                    row.insertCell(4).innerText = rental.available ? 'Yes' : 'No';\
                    \
                    const actionsCell = row.insertCell(5);\
                    const editButton = document.createElement('button');\
                    editButton.innerText = 'Edit';\
                    editButton.onclick = () => editRental(rental);\
                    actionsCell.appendChild(editButton);\
\
                    const deleteButton = document.createElement('button');\
                    deleteButton.innerText = 'Delete';\
                    deleteButton.onclick = () => deleteRental(rental.id);\
                    actionsCell.appendChild(deleteButton);\
                \});\
            \});\
    \}\
\
    // Add new rental\
    addRentalForm.onsubmit = (event) => \{\
        event.preventDefault();\
        const formData = new FormData(addRentalForm);\
        const rentalData = \{\
            model_name: formData.get('model_name'),\
            weight: formData.get('weight'),\
            category: formData.get('category'),\
            brand: formData.get('brand'),\
            available: formData.get('available') === 'on',\
        \};\
\
        fetch(API_URL, \{\
            method: 'POST',\
            headers: \{\
                'Content-Type': 'application/json',\
            \},\
            body: JSON.stringify(rentalData),\
        \})\
        .then(response => response.json())\
        .then(() => \{\
            addRentalForm.reset();\
            fetchRentals();\
        \});\
    \};\
\
    // Edit rental\
    function editRental(rental) \{\
        const model_name = prompt('Enter new model name:', rental.model_name);\
        const weight = prompt('Enter new weight:', rental.weight);\
        const category = prompt('Enter new category:', rental.category);\
        const brand = prompt('Enter new brand:', rental.brand);\
        const available = confirm('Is it available?');\
\
        const updatedRental = \{\
            model_name,\
            weight,\
            category,\
            brand,\
            available,\
        \};\
\
        fetch(`$\{API_URL\}$\{rental.id\}/`, \{\
            method: 'PUT',\
            headers: \{\
                'Content-Type': 'application/json',\
            \},\
            body: JSON.stringify(updatedRental),\
        \})\
        .then(response => response.json())\
        .then(() => \{\
            fetchRentals();\
        \});\
    \}\
\
    // Delete rental\
    function deleteRental(id) \{\
        fetch(`$\{API_URL\}$\{id\}/`, \{\
            method: 'DELETE',\
        \})\
        .then(() => \{\
            fetchRentals();\
        \});\
    \}\
\
    // Search rentals\
    searchInput.onkeyup = () => \{\
        const searchTerm = searchInput.value.toLowerCase();\
        const rows = rentalsTableBody.getElementsByTagName('tr');\
        Array.from(rows).forEach(row => \{\
            const cells = row.getElementsByTagName('td');\
            const modelName = cells[0].innerText.toLowerCase();\
            const category = cells[2].innerText.toLowerCase();\
            const brand = cells[3].innerText.toLowerCase();\
            if (modelName.includes(searchTerm) || category.includes(searchTerm) || brand.includes(searchTerm)) \{\
                row.style.display = '';\
            \} else \{\
                row.style.display = 'none';\
            \}\
        \});\
    \};\
\
    // Initial fetch\
    fetchRentals();\
\});\
}