require('dotenv').config();
const mongoose = require('mongoose');
const Knowledge = require('./models/Knowledge'); // Make sure this model exists!

const data = [
    "Standard shipping takes 3 to 5 business days and costs $5.",
    "Expedited shipping takes 1 to 2 business days and costs $15.",
    "We offer free standard shipping on all orders over $50.",
    "We currently do not ship internationally. We only ship within the contiguous United States.",
    "Our primary shipping carriers are UPS and FedEx.",
    "Tracking links are automatically emailed within 24 hours of dispatch.",
    "Missing packages must be reported within 7 days of the delivery date.",
    "Shipping addresses can only be changed within 1 hour of placing the order.",
    "We do not deliver heavy electronics to P.O. Boxes.",
    "Weekend delivery is not available; packages are delivered Monday through Friday.",
    "We offer a 30-day money-back guarantee on all electronic items.",
    "There is a 15% restocking fee for opened laptops and desktop computers.",
    "Refunds take 3 to 5 business days to appear on your bank statement.",
    "If you choose store credit instead of a refund, it is applied instantly.",
    "Final sale and clearance items cannot be returned.",
    "Digital software purchases are non-refundable once viewed.",
    "Return shipping labels are free if the item arrived defective.",
    "Buyer's remorse returns have a $7 fee deducted from the refund.",
    "If an item arrives broken, email support with a picture within 48 hours.",
    "Items received as gifts can only be returned for store credit.",
    "We accept Visa, Mastercard, American Express, PayPal, and Apple Pay.",
    "We do not accept cryptocurrency or cash on delivery.",
    "Charges will appear on your statement as 'TechStore Inc'.",
    "Download PDF invoices from the Order History section of your dashboard.",
    "To reset your password, click 'Forgot Password' on the login page.",
    "Accounts are locked for 30 minutes after 5 failed login attempts.",
    "To delete your account, you must email privacy@techstore.com.",
    "Software subscription renewals happen automatically on the 1st of every month.",
    "We offer a 10% student discount via UNiDAYS verification.",
    "Tax-exempt users must upload their certificate in profile settings.",
    "All new electronics come with a standard 1-year manufacturer warranty.",
    "TechProtect extended warranties must be bought within 30 days of purchase.",
    "Certified refurbished items come with a limited 90-day warranty.",
    "Warranties do not cover accidental damage like water spills or cracks.",
    "Out-of-stock items ship within 2 to 3 weeks.",
    "We do not price match competitors like Amazon or Best Buy.",
    "We offer bulk discounts of 5% for business orders of 10+ items.",
    "Gift cards expire 5 years from the date of purchase.",
    "Pre-order charges are processed immediately to reserve your item.",
    "We only sell Original Equipment Manufacturer (OEM) parts.",
    "To hard reset a laptop, hold the power button for 30 seconds.",
    "BIOS updates for Wi-Fi issues are available on our drivers page.",
    "Report Blue Screen errors to tier2@techstore.com with the stop code.",
    "To factory reset a phone, go to Settings > General > Reset.",
    "Plug monitor cables into the graphics card, not the motherboard.",
    "Smartwatches sync via the TechStore Health app on iOS and Android.",
    "Disable 'Background App Refresh' to save device battery.",
    "To fix Bluetooth issues, 'Forget' the device and re-pair it.",
    "Default admin password for TechStore Routers is 'admin123'.",
    "Serial numbers are found on the silver sticker on the bottom casing."
];

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log("Connecting to MongoDB Atlas...");
        await Knowledge.deleteMany({}); // Clears the empty list
        const docs = data.map(text => ({ text }));
        await Knowledge.insertMany(docs);
        console.log("✅ SUCCESS: 50 FAQs are now in MongoDB Atlas!");
        process.exit();
    })
    .catch(err => {
        console.error("❌ Error:", err);
        process.exit(1);
    });