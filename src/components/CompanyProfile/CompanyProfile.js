import React from 'react';
import './CompanyProfile.css'; // Import the CSS file

const CompanyProfile = ({ profile }) => {
    if (!profile) return <p>No company profile available</p>;

    return (
        <div className="company-profile-container">
            <div className="company-info-container">
                <h2>{profile.companyName} ({profile.symbol})</h2>
                <p>{profile.description}</p>
                <div><strong>CEO:</strong> {profile.ceo}</div>
                <div><strong>Sector:</strong> {profile.sector}</div>
                <div><strong>Industry:</strong> {profile.industry}</div>
                <div><strong>Exchange:</strong> {profile.exchange}</div>
                <div><strong>Price:</strong> ${profile.price}</div>
                <div><strong>Market Cap:</strong> ${profile.mktCap.toLocaleString()}</div>
                <div><strong>Volume Average:</strong> {profile.volAvg.toLocaleString()}</div>
                <div><strong>Employees:</strong> {profile.fullTimeEmployees}</div>
                <div><strong>Website:</strong> <a href={profile.website} target="_blank" rel="noopener noreferrer">{profile.website}</a></div>
                <div><strong>Address:</strong> {profile.address}, {profile.city}, {profile.state}, {profile.zip}, {profile.country}</div>
                <div><strong>Phone:</strong> {profile.phone}</div>
                <div><strong>IPO Date:</strong> {profile.ipoDate}</div>
            </div>
        </div>
    );
};

export default CompanyProfile;
