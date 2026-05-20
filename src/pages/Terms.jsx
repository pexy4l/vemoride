import React from 'react';
import { Helmet } from 'react-helmet';

const Terms = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service - VemoRide</title>
        <meta name="description" content="Terms of service for VemoRide car rental services" />
      </Helmet>

      <div className="bg-gray-50 min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
          
          <div className="bg-white p-8 rounded-lg shadow-sm prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">Last updated: {new Date().toLocaleDateString()}</p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Rental Agreement</h2>
              <p className="text-gray-600">
                By renting a vehicle from VemoRide, you agree to these terms and conditions. 
                The rental agreement is between you (the renter) and VemoRide.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Driver Requirements</h2>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Must be at least 21 years of age</li>
                <li>Must possess a valid driver's license</li>
                <li>Must provide valid identification</li>
                <li>International visitors must have an International Driving Permit</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment Terms</h2>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Payment is required at the time of vehicle pickup</li>
                <li>A security deposit is required for all rentals</li>
                <li>Accepted payment methods: Cash, Bank Transfer</li>
                <li>Rates are quoted in Nigerian Naira (NGN)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Vehicle Use</h2>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Vehicles must be used only within Lagos and surrounding areas unless otherwise agreed</li>
                <li>Smoking is prohibited in all vehicles</li>
                <li>Vehicles must be returned in the same condition as received</li>
                <li>Unauthorized drivers are not permitted</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Fuel Policy</h2>
              <p className="text-gray-600">
                Vehicles are provided with a full tank of fuel and must be returned with a full tank. 
                Failure to do so will result in refueling charges.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Cancellation Policy</h2>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Free cancellation up to 24 hours before pickup</li>
                <li>Cancellations within 24 hours may incur charges</li>
                <li>No-shows will be charged the full rental amount</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Insurance and Liability</h2>
              <p className="text-gray-600 mb-4">
                Basic insurance is included with all rentals. The renter is responsible for:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Any damage to the vehicle during the rental period</li>
                <li>Traffic violations and fines</li>
                <li>Loss or theft of the vehicle</li>
              <li>Any damage to the vehicle during the rental period</li>
              <li>Traffic violations and fines</li>
              <li>Loss or theft of the vehicle</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Late Returns</h2>
              <p className="text-gray-600">
                A grace period of 1 hour is provided. After this, additional charges will apply 
                at an hourly rate. Returns more than 3 hours late will be charged for an additional day.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
              <p className="text-gray-600">
                For questions about these terms, please contact us at:
              </p>
              <p className="text-gray-600 mt-4">
                Email: info@easyluxurydrive.com<br />
                Phone: +234 808 740 1435
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Terms;