// src/pages/AboutPage.jsx

import React from 'react';

const AboutPage = () => {
  return (
    <>
      <style>{`
       /* Elegant dark gradient background */
.about-page-wrapper {
  position: relative;
  min-height: 100vh;
  padding: 60px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
  overflow: hidden;
}

/* Blurred animated neon blobs */
.background-blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  opacity: 0.5;
  animation: float 10s ease-in-out infinite;
  z-index: 0;
}

/* Neon pink blob */
.blob1 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, #ff6ec4, #7873f5);
  top: -100px;
  left: -120px;
}

/* Neon blue blob */
.blob2 {
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, #38f9d7, #43e97b);
  bottom: -150px;
  right: -100px;
  animation-delay: 5s;
}

        @keyframes float {
          0% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(30px) translateX(20px); }
          100% { transform: translateY(0px) translateX(0px); }
        }

        /* Glassmorphism Card */
        .about-card {
          position: relative;
          z-index: 1;
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          max-width: 950px;
          padding: 50px 40px;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.15);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.75;
          color: #333;
          transition: transform 0.3s;
        }

        .about-card:hover {
          transform: translateY(-4px);
        }

       .about-heading {
  font-size: 2.7rem;
  margin-bottom: 25px;
  text-align: center;
  background: linear-gradient(90deg, #43cea2, #185a9d, #f7971e);
  background-size: 300% 300%;
  animation: gradientShift 8s ease infinite;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Smooth animated gradient shift */
@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}


        .about-subheading {
          font-size: 2rem;
          margin-top: 40px;
          margin-bottom: 20px;
          color: #333;
          border-bottom: 2px solid #eee;
          padding-bottom: 8px;
        }

        .about-paragraph {
          margin-bottom: 20px;
          font-size: 1.15rem;
          color: #444;
        }

        .about-values {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 30px;
        }

        .value-item {
          background-color: rgba(255,255,255,0.8);
          padding: 14px 18px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          display: flex;
          align-items: center;
          transition: all 0.3s;
        }

        .value-item:hover {
          background-color: #fff0f0;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        .icon {
          width: 40px;
          height: 40px;
          margin-right: 12px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .quality-icon {
          background: linear-gradient(135deg, #ff7e5f, #feb47b);
        }

        .transparency-icon {
          background: linear-gradient(135deg, #6a11cb, #2575fc);
        }

        .skills-icon {
          background: linear-gradient(135deg, #43cea2, #185a9d);
        }

        .customer-icon {
          background: linear-gradient(135deg, #f7971e, #ffd200);
        }
      `}</style>

      <div className="about-page-wrapper">
        {/* Background blobs */}
        <div className="background-blob blob1"></div>
        <div className="background-blob blob2"></div>

        <div className="about-card">
          <h1 className="about-heading">About PaintWorks</h1>
          <p className="about-paragraph">
            Welcome to <strong>PaintWorks</strong>, your trusted partner for all painting and renovation services.
            We connect you with skilled and verified painters to bring color and life to your spaces — whether it’s your home, office, or commercial property.
          </p>
          <p className="about-paragraph">
            Our mission is to simplify the process of finding reliable painters, streamline booking and communication, and ensure high-quality workmanship every time.
          </p>
          <p className="about-paragraph">
            Founded in <strong>2025</strong>, PaintWorks has quickly grown into a community-driven platform that prioritizes customer satisfaction, fair pricing, and craftsmanship excellence.
          </p>

          <h2 className="about-subheading">Our Core Values</h2>
          <div className="about-values">
            <div className="value-item">
              <div className="icon quality-icon"></div>
              <span>Quality and Reliability</span>
            </div>
            <div className="value-item">
              <div className="icon transparency-icon"></div>
              <span>Transparency and Fair Pricing</span>
            </div>
            <div className="value-item">
              <div className="icon skills-icon"></div>
              <span>Skilled and Verified Professionals</span>
            </div>
            <div className="value-item">
              <div className="icon customer-icon"></div>
              <span>Customer-Centric Service</span>
            </div>
          </div>

          <p className="about-paragraph">
            Thank you for choosing <strong>PaintWorks</strong> — let’s make your space beautiful!
          </p>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
