document.addEventListener('DOMContentLoaded', function() {
    fetch('bigCats.json')
        .then(response => response.json())
        .then(data => new AnimalTable('bigCatsTable', data, ['species', 'name', 'size', 'location'], ''));

    fetch('dogs.json')
        .then(response => response.json())
        .then(data => new AnimalTable('dogsTable', data, ['name', 'location'], 'bold-text'));

    fetch('bigFish.json')
        .then(response => response.json())
        .then(data => new AnimalTable('bigFishTable', data, ['size'], 'bold-italic-blue'));
});

class AnimalTable {
    constructor(tableId, animals, sortableFields, nameClass) {
        this.tableId = tableId;
        this.animals = animals;
        this.sortableFields = sortableFields;
        this.nameClass = nameClass;
        this.render();
    }

    render() {
        let table = document.createElement('table');
        table.className = 'table table-striped';
        
        let thead = table.createTHead();
        let headerRow = thead.insertRow();
        let fields = ['Species', 'Name', 'Size', 'Location', 'Image'];

        fields.forEach(field => {
            let th = document.createElement('th');
            th.textContent = field;
            if (this.sortableFields.includes(field.toLowerCase()) && field.toLowerCase() !== 'image') {
                th.addEventListener('click', () => this.sortByField(field.toLowerCase()));
                th.style.cursor = 'pointer';
            }
            headerRow.appendChild(th);
        });

        let tbody = table.createTBody();

        this.animals.forEach(animal => {
            let row = tbody.insertRow();
            row.insertCell().textContent = animal.species;

            let nameCell = row.insertCell();
            nameCell.textContent = animal.name;
            if (this.nameClass) {
                nameCell.classList.add(this.nameClass);
            }

            row.insertCell().textContent = animal.size + ' ft';
            row.insertCell().textContent = animal.location;

            let imgCell = row.insertCell();
            if (animal.image) {
                let img = document.createElement('img');
                img.src = animal.image;
                img.style.width = '100px';
                imgCell.appendChild(img);
            }
        });

        const container = document.getElementById(this.tableId);
        container.innerHTML = '';
        container.appendChild(table);
    }

    sortByField(field) {
        if (field === 'size') { 
            this.animals.sort((a, b) => a[field] - b[field]);
        } else { 
            this.animals.sort((a, b) => a[field].localeCompare(b[field]));
        }
        this.render();
    }
}
