import React from 'react';
import './CompanyLogo.css'; // Import the CSS file

const CompanyLogo = ({ logoUrl, companyName }) => {
    if (!logoUrl) {
        return <p>No logo available</p>;
    }

    return (
        <div className="company-logo-container mr-auto">
            <img src={logoUrl} alt={`${companyName} Logo`} className="company-logo" />
        </div>
    );
};

export default CompanyLogo;
