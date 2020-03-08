const reloadCollections = () => {
    let select = document.getElementById('db');
    let selected = select.options[select.selectedIndex].value;

    let url = '/collections';
    let data = { dbName: selected }

    fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .then(data => {
            let result = '';
            data.forEach(element => {
                result += `<option value="${element.name}">${element.name}</option>`;
            });
            document.getElementById('collection').innerHTML = result;
            reloadRecords();
        });
}

const reloadRecords = () => {
    document.getElementById('records').innerHTML = `
    <tr>
        <div class="text-center">
            <div class="spinner-border text-secondary m-4" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
    </tr>
    `;
    let dbSelect = document.getElementById('db');
    let dbSelected = dbSelect.options[dbSelect.selectedIndex].value;
    let collectionSelect = document.getElementById('collection');
    let collectionSelected = collectionSelect.options[collectionSelect.selectedIndex].value;

    let url = '/records';
    let data = {
        dbName: dbSelected,
        dbCollection: collectionSelected
    }

    fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .then(data => {
            let result = '';
            data.forEach((element, index) => {
                let content = '';
                for (const key in element) {
                    content += `<b>${key}:</b> ${element[key]}<br>`;
                }
                result += `<tr>
                <th scope="row">${index+1}</th>
                <td>${content}</td>
                <td>
                    <button type="button" class="btn btn-danger" onClick="deleteRecord('${element._id}')">Delete</button>
                    <button type="button" class="btn btn-info">Update</button>
                </td>
            </tr>`;
            });
            document.getElementById('records').innerHTML = result;
        });
}

const deleteRecord = (_id) => {
    let dbSelect = document.getElementById('db');
    let dbSelected = dbSelect.options[dbSelect.selectedIndex].value;
    let collectionSelect = document.getElementById('collection');
    let collectionSelected = collectionSelect.options[collectionSelect.selectedIndex].value;

    let url = '/records';
    let data = {
        dbName: dbSelected,
        dbCollection: collectionSelected,
        _id
    }

    fetch(url, {
            method: 'DELETE',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .then(data => {
            reloadRecords();
        });
}

const createRecord = () => {
    let dbSelect = document.getElementById('db');
    let dbSelected = dbSelect.options[dbSelect.selectedIndex].value;
    let collectionSelect = document.getElementById('collection');
    let collectionSelected = collectionSelect.options[collectionSelect.selectedIndex].value;

    let url = '/records';
    let data = {
        dbName: dbSelected,
        dbCollection: collectionSelected,
        limit: 1
    }

    fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .then(data => {
            let result = '';
            data.forEach((element) => {
                let content = '';
                for (const key in element) {
                    if (key === '_id')
                        continue;
                    content += `
                    <div class="form-group">
                        <label for="${key}">${key}</label>
                        <input type="text" class="form-control" id="${key}">
                    </div>`;
                }
                result += `
                <form name="formulario">
                    ${content}
              </form>
              <button onClick="createRecordSend()" class="btn btn-primary">Submit</button>
              <button type="button" class="btn btn-danger" onClick="cancelCreate()">Cancel</button>`;
            });
            document.getElementById('form-record').innerHTML = result;
        });
}

const cancelCreate = () => {
    document.getElementById('form-record').innerHTML = `
    <button type="button" class="btn btn-success" onclick="createRecord()">Create a new record!</button>`;
}

const createRecordSend = () => {

    let form = document.getElementById('form-record');
}

reloadCollections();