// Function to toggle between views based on entry selection
function showView(viewId) {
    // Fade out entry screen
    const entryScreen = document.getElementById('entry-screen');
    entryScreen.classList.add('fade-out');

    // Hide entry screen fully after transition
    setTimeout(() => {
        entryScreen.style.display = 'none';
    }, 500);

    // Hide all main views
    const views = document.querySelectorAll('.view');
    views.forEach(v => {
        v.classList.add('hidden');
    });

    // Show the targeted view
    const targetView = document.getElementById(viewId);
    if (targetView) {
        targetView.classList.remove('hidden');
    }

    // Show the global header
    document.getElementById('main-header').classList.remove('hidden');

    // Update floating buttons based on view
    const waFloat = document.querySelector('.wa-float');
    const callFloat = document.querySelector('.call-float');
    if (waFloat && callFloat) {
        waFloat.classList.remove('hidden');
        callFloat.classList.remove('hidden');
        if (viewId === 'view-tent') {
            waFloat.href = 'https://wa.me/918553385690?text=Hello%20Plaza%20Tent%20House,%20I%20would%20like%20to%20enquire%20about%20decor%20and%20furniture.';
            callFloat.href = 'tel:+918553385690';
        } else if (viewId === 'view-catering') {
            waFloat.href = 'https://wa.me/917204189449?text=Hello%20Plaza%20Caterers,%20I%20would%20like%20to%20enquire%20about%20catering%20services.';
            callFloat.href = 'tel:+917204189449';
        } else {
            // view-hall or default
            waFloat.href = 'https://wa.me/918971525559?text=Hello%20Plaza%20Party%20Hall,%20I%20would%20like%20to%20enquire%20about%20your%20services.';
            callFloat.href = 'tel:+918971525559';
        }
    }

    // Scroll cleanly to the top
    window.scrollTo({ top: 0, behavior: 'instant' });
}

// Function to return to the Entry Selection Mode
function showEntry() {
    // Hide all views and header
    const views = document.querySelectorAll('.view');
    views.forEach(v => {
        v.classList.add('hidden');
    });
    document.getElementById('main-header').classList.add('hidden');

    // Show entry screen and fade it in
    const entryScreen = document.getElementById('entry-screen');
    entryScreen.style.display = 'flex';

    setTimeout(() => {
        entryScreen.classList.remove('fade-out');
    }, 10);

    // Reset floating buttons to default
    const waFloat = document.querySelector('.wa-float');
    const callFloat = document.querySelector('.call-float');
    if (waFloat && callFloat) {
        waFloat.classList.add('hidden');
        callFloat.classList.add('hidden');
        waFloat.href = 'https://wa.me/918971525559?text=Hello%20Plaza%20Party%20Hall,%20I%20would%20like%20to%20enquire%20about%20your%20services.';
        callFloat.href = 'tel:+918971525559';
    }

    window.scrollTo({ top: 0, behavior: 'instant' });
}

// Smooth scroll to enquiry form
function scrollToForm(e, formId) {
    e.preventDefault();
    const el = document.getElementById(formId);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// ============================================
// ENQUIRY FORM SUBMISSIONS (via WhatsApp)
// ============================================
const HALL_WA_NUMBER = '918971525559';
const CATERER_WA_NUMBER = '917204189449';
const TENT_WA_NUMBER = '918553385690';

function submitHallForm(e) {
    e.preventDefault();
    const name = document.getElementById('hall-name').value.trim();
    const phone = document.getElementById('hall-phone').value.trim();
    const event = document.getElementById('hall-event').value;
    const guests = document.getElementById('hall-guests').value;
    const date = document.getElementById('hall-date').value;
    const notes = document.getElementById('hall-notes').value.trim();

    let msg = `🏛️ *PARTY HALL ENQUIRY*\n\n`;
    msg += `👤 *Name:* ${name}\n`;
    msg += `📱 *Phone:* ${phone}\n`;
    msg += `🎉 *Event:* ${event}\n`;
    msg += `👥 *Guests:* ${guests}\n`;
    msg += `📅 *Date:* ${formatDate(date)}\n`;
    if (notes) msg += `📝 *Special Requests:* ${notes}\n`;
    msg += `\n_Sent from Plaza Party Hall Website_`;

    window.open(`https://wa.me/${HALL_WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
}

function submitCateringForm(e) {
    e.preventDefault();
    const name = document.getElementById('cater-name').value.trim();
    const phone = document.getElementById('cater-phone').value.trim();
    const event = document.getElementById('cater-event').value;
    const pkg = document.getElementById('cater-package').value;
    const guests = document.getElementById('cater-guests').value;
    const date = document.getElementById('cater-date').value;
    const location = document.getElementById('cater-location').value.trim();
    const notes = document.getElementById('cater-notes').value.trim();

    let msg = `🍽️ *CATERING ORDER ENQUIRY*\n\n`;
    msg += `👤 *Name:* ${name}\n`;
    msg += `📱 *Phone:* ${phone}\n`;
    msg += `🎉 *Function:* ${event}\n`;
    msg += `📦 *Package:* ${pkg}\n`;
    msg += `👥 *Guests:* ${guests}\n`;
    msg += `📅 *Delivery Date:* ${formatDate(date)}\n`;
    msg += `📍 *Location:* ${location}\n`;
    if (notes) msg += `📝 *Food Requests:* ${notes}\n`;
    msg += `\n_Sent from Plaza Caterers Website_`;

    window.open(`https://wa.me/${CATERER_WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
}

function submitTentForm(e) {
    e.preventDefault();
    const name = document.getElementById('tent-name').value.trim();
    const phone = document.getElementById('tent-phone').value.trim();
    const event = document.getElementById('tent-event').value;
    const date = document.getElementById('tent-date').value;
    const guests = document.getElementById('tent-guests').value;
    const location = document.getElementById('tent-location').value.trim();
    const notes = document.getElementById('tent-notes').value.trim();

    // Collect checked items
    const checkedItems = [];
    document.querySelectorAll('input[name="tent-items"]:checked').forEach(cb => {
        checkedItems.push(cb.value);
    });
    const items = checkedItems.length > 0 ? checkedItems.join(', ') : 'Not specified';

    let msg = `⛺ *TENT HOUSE ENQUIRY*\n\n`;
    msg += `👤 *Name:* ${name}\n`;
    msg += `📱 *Phone:* ${phone}\n`;
    msg += `🎉 *Occasion:* ${event}\n`;
    msg += `📅 *Event Date:* ${formatDate(date)}\n`;
    msg += `🪑 *Items Needed:* ${items}\n`;
    msg += `👥 *Guests:* ${guests}\n`;
    msg += `📍 *Location:* ${location}\n`;
    if (notes) msg += `📝 *Special Requests:* ${notes}\n`;
    msg += `\n_Sent from Plaza Tent House Website_`;

    window.open(`https://wa.me/${TENT_WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
}

// Helper: Format date to readable string
function formatDate(dateStr) {
    if (!dateStr) return 'Not specified';
    const d = new Date(dateStr);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return d.toLocaleDateString('en-IN', options);
}
