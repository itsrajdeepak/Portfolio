import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import emailjs from '@emailjs/browser';
import { Snackbar, Alert } from '@mui/material';

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
  @media (max-width: 960px) {
    padding: 0;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1350px;
  width: 100%;
  padding-bottom: 80px;
  gap: 12px;
`;

const Title = styled.div`
  font-size: 42px;
  font-weight: 600;
  text-align: center;
  margin-top: 20px;
  color: ${({ theme }) => theme.text_primary};
  @media (max-width: 768px) {
    font-size: 32px;
    margin-top: 12px;
  }
`;

const Desc = styled.div`
  font-size: 18px;
  text-align: center;
  max-width: 600px;
  color: ${({ theme }) => theme.text_secondary};
  @media (max-width: 768px) {
    font-size: 16px;
    margin-top: 12px;
  }
`;

const ContactForm = styled.form`
  width: 95%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.card};
  padding: 32px;
  border-radius: 16px;
  box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
  margin-top: 28px;
  gap: 12px;
`;

const ContactTitle = styled.div`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 6px;
  color: ${({ theme }) => theme.text_primary};
`;

const ContactInput = styled.input`
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  &:focus {
    border-color: ${({ theme }) => theme.primary};
  }
`;

const ContactInputMessage = styled.textarea`
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.text_secondary};
  outline: none;
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  border-radius: 12px;
  padding: 12px 16px;
  resize: vertical;
  &:focus {
    border-color: ${({ theme }) => theme.primary};
  }
`;

const ContactButton = styled.button`
  width: 100%;
  background: linear-gradient(225deg, hsla(271, 100%, 50%, 1), hsla(294, 100%, 50%, 1));
  padding: 13px 16px;
  margin-top: 2px;
  border-radius: 12px;
  border: none;
  color: ${({ theme }) => theme.text_primary};
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 20px rgba(135, 42, 235, 0.3);
  }

  &:active {
    transform: scale(0.98);
  }
`;

// Main Component
const Contact = () => {
  const form = useRef();
  const [open, setOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs.sendForm('service_e2zj4hw', 'template_wnqu342', form.current, 'VXlWG4XJovRlW07ME')
      .then(() => {
        setOpen(true);
        form.current.reset();
      })
      .catch((error) => {
        console.error('EmailJS Error:', error.text);
      });
  };

  return (
    <Container>
      <Wrapper>
        <Title>Contact</Title>
        <Desc>Feel free to reach out to me for any questions or opportunities!</Desc>

        <ContactForm ref={form} onSubmit={handleSubmit}>
          <ContactTitle>Email Me 🚀</ContactTitle>
          <ContactInput placeholder="Your Email" name="from_email" required />
          <ContactInput placeholder="Your Name" name="from_name" required />
          <ContactInput placeholder="Subject" name="subject" required />
          <ContactInputMessage placeholder="Message" rows="4" name="message" required />
          <ContactButton type="submit">Send</ContactButton>
        </ContactForm>

        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={() => setOpen(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={() => setOpen(false)} severity="success" sx={{ width: '100%' } }>
            Email sent successfully!
          </Alert>
        </Snackbar>
      </Wrapper>
    </Container>
  );
};

export default Contact;
