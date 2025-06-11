interface Contact {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
}

let contacts: Contact[] = [];

const contactList = document.getElementById('contact-list') as HTMLUListElement;
const form = document.getElementById('contact-form') as HTMLFormElement;
const nameInput = document.getElementById('name') as HTMLInputElement;
const phoneInput = document.getElementById('phone') as HTMLInputElement;
const emailInput = document.getElementById('email') as HTMLInputElement;
const addressInput = document.getElementById('address') as HTMLInputElement;
const idInput = document.getElementById('contact-id') as HTMLInputElement;
const notification = document.getElementById('notification') as HTMLDivElement;

function showNotification(message: string, type: 'success' | 'danger' | 'info') {
  notification.textContent = message;
  notification.className = `alert alert-${type} mt-4`;
  notification.classList.remove('d-none');

  setTimeout(() => {
    notification.classList.add('d-none');
  }, 3000);
}

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

(window as any).editContact = function (id: number) {
  const contact = contacts.find(c => c.id === id);
  if (contact) {
    idInput.value = contact.id.toString();
    nameInput.value = contact.name;
    phoneInput.value = contact.phone;
    emailInput.value = contact.email;
    addressInput.value = contact.address;
    showNotification('Editing contact...', 'info');
  }
};

(window as any).deleteContact = function (id: number) {
  contacts = contacts.filter(contact => contact.id !== id);
  renderContacts();
  showNotification('Contact deleted successfully!', 'danger');
};

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const id = idInput.value ? parseInt(idInput.value) : Date.now();

  const newContact: Contact = {
    id,
    name: nameInput.value,
    phone: phoneInput.value,
    email: emailInput.value,
    address: addressInput.value
  };

  if (idInput.value) {
    contacts = contacts.map(contact => contact.id === id ? newContact : contact);
    showNotification('Contact updated successfully!', 'success');
  } else {
    contacts.push(newContact);
    showNotification('Contact added successfully!', 'success');
  }

  renderContacts();
  resetForm();
});

renderContacts();