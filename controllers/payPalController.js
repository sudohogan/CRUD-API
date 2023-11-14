const paypal = require('paypal-rest-sdk');

// Configure PayPal SDK with your credentials
paypal.configure({
  mode: 'sandbox', // Change to 'live' for production
  client_id: 'AYcycRkGfWDVCC4Im4ZC3GrtnYbiBQTpSAK_nRviJ-u28PM9jj-Ezo5KONMDJeD_8n3k_vZ5q8g09JWt',
  client_secret: 'EB64JE25NUqUBKgqmbqYYyKaU93hAV3wNuBLT6LDeUKmQVSkMg3LkbUNuRiZr2ToEaNyL-aKtxBVxked',
});

const createSubscription = (req, res) => {
  const { planId, returnUrl, cancelUrl } = req.body;

  const billingPlanAttributes = {
    description: 'Example subscription plan',
    merchant_preferences: {
      auto_bill_amount: 'yes',
      cancel_url: cancelUrl,
      return_url: returnUrl,
    },
    name: 'Example Subscription Plan',
    payment_definitions: [
      {
        amount: {
          currency: 'USD',
          value: '10.00',
        },
        cycles: '0',
        frequency: 'MONTH',
        frequency_interval: '1',
        name: 'Regular Payment',
        type: 'REGULAR',
      },
    ],
    type: 'INFINITE',
  };

  paypal.billingPlan.create(billingPlanAttributes, (error, billingPlan) => {
    if (error) {
      console.error(error);
      res.sendStatus(500);
    } else {
      const billingAgreementAttributes = {
        name: 'Example Subscription Agreement',
        description: 'Example subscription agreement',
        start_date: new Date().toISOString().slice(0, 19),
        plan: {
          id: billingPlan.id,
        },
        payer: {
          payment_method: 'paypal',
        },
        shipping_address: {
          line1: '1234 Example Street',
          city: 'Example City',
          state: 'Example State',
          postal_code: '12345',
          country_code: 'US',
        },
      };

      paypal.billingAgreement.create(billingAgreementAttributes, (error, billingAgreement) => {
        if (error) {
          console.error(error);
          res.sendStatus(500);
        } else {
          // Redirect the user to the PayPal approval URL
          for (let i = 0; i < billingAgreement.links.length; i++) {
            if (billingAgreement.links[i].rel === 'approval_url') {
              res.redirect(billingAgreement.links[i].href);
              break;
            }
          }
        }
      });
    }
  });
};

const executeSubscription = (req, res) => {
  const { token } = req.query;

  paypal.billingAgreement.execute(token, {}, (error, billingAgreement) => {
    if (error) {
      console.error(error);
      res.sendStatus(500);
    } else {
      // Subscription executed successfully
      res.send('Subscription successful');
    }
  });
};

module.exports = {
  createSubscription,
  executeSubscription,
};