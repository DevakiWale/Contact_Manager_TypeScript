"use strict";
let contacts = [];
const contactList = document.getElementById('contact-list');
const form = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const phoneInput = document.getElementById('phone');
const emailInput = document.getElementById('email');
const addressInput = document.getElementById('address');
const idInput = document.getElementById('contact-id');
function renderContacts() {
    contactList.innerHTML = '';
    contacts.forEach(contact => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
      <div>
        <strong>${contact.name}</strong> - ${contact.phone} - ${contact.email}
      </div>
      <div>
        <button class="btn btn-sm btn-warning me-2" onclick="editContact(${contact.id})">Edit</button>
        <button class="btn btn-sm btn-danger" onclick="deleteContact(${contact.id})">Delete</button>
      </div>
    `;
        contactList.appendChild(li);
    });
}
function resetForm() {
    idInput.value = '';
    form.reset();
}
window.editContact = function (id) {
    const contact = contacts.find(c => c.id === id);
    if (contact) {
        idInput.value = contact.id.toString();
        nameInput.value = contact.name;
        phoneInput.value = contact.phone;
        emailInput.value = contact.email;
        addressInput.value = contact.address;
    }
};
window.deleteContact = function (id) {
    contacts = contacts.filter(contact => contact.id !== id);
    renderContacts();
};
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = idInput.value ? parseInt(idInput.value) : Date.now();
    const newContact = {
        id,
        name: nameInput.value,
        phone: phoneInput.value,
        email: emailInput.value,
        address: addressInput.value
    };
    if (idInput.value) {
        contacts = contacts.map(contact => contact.id === id ? newContact : contact);
    }
    else {
        contacts.push(newContact);
    }
    renderContacts();
    resetForm();
});
renderContacts();
