import requests

# 50 Unique Documents covering Shipping, Refunds, Billing, Tech Support, and Policies
company_faqs = {
    "documents": [
        # --- ORDER & SHIPPING ---
        "Standard shipping takes 3 to 5 business days and costs $5.",
        "Expedited shipping takes 1 to 2 business days and costs $15.",
        "We offer free standard shipping on all orders over $50.",
        "We currently do not ship internationally. We only ship within the contiguous United States, Alaska, and Hawaii.",
        "Our primary shipping carriers are UPS and FedEx.",
        "Tracking links are automatically emailed to the customer within 24 hours of the item being dispatched.",
        "Missing or stolen packages must be reported to support within 7 days of the delivery date.",
        "Shipping addresses can only be changed within 1 hour of placing the order by calling support.",
        "We do not deliver heavy electronics or laptops to P.O. Boxes.",
        "Weekend delivery is not available; packages are only delivered Monday through Friday.",

        # --- RETURNS & REFUNDS ---
        "We offer a 30-day money-back guarantee on all electronic items. Items must be in their original packaging.",
        "There is a 15% restocking fee for opened laptops and desktop computers.",
        "Refunds take 3 to 5 business days to appear on your credit card statement after we receive the item.",
        "If you choose store credit instead of a refund, it is applied to your account instantly.",
        "Final sale and clearance items cannot be returned or exchanged.",
        "Digital software purchases and activation keys are strictly non-refundable once viewed.",
        "Return shipping labels are provided for free if the item arrived defective or broken.",
        "If you are returning an item due to buyer's remorse, a $7 return shipping fee will be deducted from your refund.",
        "If an item arrives broken, you must email support with a picture within 48 hours to get a free replacement.",
        "Items received as gifts can only be returned for store credit, not a cash refund.",

        # --- ACCOUNT & BILLING ---
        "We accept Visa, Mastercard, American Express, PayPal, and Apple Pay.",
        "We do not currently accept cryptocurrency or cash on delivery (COD).",
        "Charges will appear on your bank statement as 'TechStore Inc'.",
        "You can download PDF invoices for your purchases by navigating to the Order History section of your dashboard.",
        "To reset your password, click the 'Forgot Password' link on the login page and follow the email instructions.",
        "For security, accounts are temporarily locked for 30 minutes after 5 failed login attempts.",
        "To permanently delete your account and all associated data, you must email privacy@techstore.com.",
        "Software subscription renewals happen automatically on the 1st of every month.",
        "We offer a 10% student discount. You must verify your active .edu email address through UNiDAYS.",
        "If you are tax-exempt, you must upload your state tax exemption certificate in your profile settings before checking out.",

        # --- PRODUCT & WARRANTY ---
        "All new electronics come with a standard 1-year manufacturer warranty.",
        "Extended warranties, like TechProtect, must be purchased within 30 days of buying the original device.",
        "Certified refurbished items come with a limited 90-day warranty.",
        "Our warranties do not cover accidental damage, such as water spills or screen cracks.",
        "Out-of-stock items can be backordered and typically ship within 2 to 3 weeks.",
        "We do not price match competitors like Amazon or Best Buy.",
        "We offer bulk discounts of 5% for business orders of 10 or more identical items.",
        "Digital and physical gift cards expire 5 years from the date of purchase.",
        "If you pre-order an upcoming item, your credit card is charged immediately to reserve your spot in line.",
        "We only sell Original Equipment Manufacturer (OEM) parts, no third-party knockoffs.",

        # --- TECHNICAL SUPPORT & TROUBLESHOOTING ---
        "If your laptop will not turn on, hold down the power button for 30 seconds to perform a hard reset.",
        "If your Wi-Fi keeps dropping, you likely need a BIOS update which can be downloaded from our drivers page.",
        "Blue screen of death (BSOD) errors should be reported to tier2@techstore.com along with the stop code.",
        "To factory reset a smartphone, go to Settings, tap General, and select Reset All Content and Settings.",
        "If your new monitor displays 'No Signal', ensure the HDMI or DisplayPort cable is plugged directly into the graphics card, not the motherboard.",
        "Our smartwatches sync to your phone via the TechStore Health app, available on both iOS and Android.",
        "If your device battery drains too quickly, try disabling 'Background App Refresh' in your settings.",
        "If your Bluetooth headphones won't connect, go to your phone settings, 'Forget' the device, and re-pair them.",
        "The default admin password for our TechStore Wi-Fi Routers is 'admin123'.",
        "You can find the serial number of your device printed on the silver sticker on the bottom casing."
    ]
}

print("Sending 50 documents to the AI for Vectorization...")
response = requests.post('http://127.0.0.1:8000/train', json=company_faqs)

if response.status_code == 200:
    print("\n✅ SUCCESS!")
    print(response.json())
else:
    print("\n❌ ERROR!")
    print(response.text)