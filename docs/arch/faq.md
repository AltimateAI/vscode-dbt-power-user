The extension dbt Power User is owned by our parent entity, [Altimate Inc](https://www.notion.so/Altimate-AI-blurb-f4f12bb022524e6bbc3f9adac454a5f3?pvs=21). We are an early-stage ventured-backed startup based in the San Francisco Bay Area.

## **Security FAQ for dbt Power User AI Doc Gen**

### **Security Measures & Protocols**

### 1. **Is my data encrypted during transmission?**

Yes, all data transmitted to and from our service is encrypted using Transport Layer Security (TLS). This ensures that your data remains confidential and cannot be intercepted or tampered with during transmission.

### 2. **How do you prevent unauthorized access to your systems?**

Our systems are designed with multiple layers of security:

- **Transmission**: We use Transport Layer Security (TLS) to encrypt data during transmission.
- **Infrastructure Security**: Our service is hosted on AWS, operating within a Private Virtual Private Cloud (VPC). This provides a secluded environment, significantly reducing intrusion risks.
- **Internal Access Controls**: Only authorized developers have access to our servers. Access rights are managed and restricted using AWS's Role-Based Access Control (RBAC) mechanism.

### 3. **Do you comply with industry security standards (e.g., ISO 27001, SOC 2)?**

We take compliance very seriously at Altimate Inc and have recently completed the SOC 2 Type 2 process to adhere to industry-leading security standards. Our service is currently under audit, which is expected to conclude on November 1st. Once completed, this audit will provide an additional layer of assurance regarding the effectiveness of our security measures and controls.

### 4. **Where are your data centers located, and what security measures are in place there?**

Our data centers are managed through Amazon Web Services (AWS), which has facilities in multiple geographic regions around the world. By leveraging AWS, we ensure our users benefit from the rigorous security standards that this leading cloud provider upholds.

### 5. **Do you have a disaster recovery and business continuity plan?**

Yes, at Altimate Inc, we have a robust disaster recovery plan in place. Our data is backed up frequently to ensure minimal data loss. In the event of any system failure, our recovery processes are designed to restore services within an hour. This quick recovery time minimizes disruptions and ensures the continuity of our services for our users.

### **Data Privacy & Retention**

### 1. **What data do you collect and for what purposes?**

When you interact with Altimate Inc. , we primarily collect metadata related to your database tables. This encompasses elements such as the list of columns, compiled SQL queries, and dependencies, which you can review [here](https://github.com/innoverio/vscode-dbt-power-user/blob/master/src/altimate.ts#L17). This collection aims to facilitate the AI-driven documentation process while ensuring minimal access to actual data contents.

### 2. **How do you ensure my data privacy?**

At Altimate Inc., ensuring the privacy of your data is a top priority. Here's how we uphold it:

- **Data Isolation**: We employ a multi-tenant architecture that inherently isolates data on a per-tenant basis.
- **Strict Access Controls**: Only a select group of authorized developers can access the collected metadata. We employ Amazon Web Services' Identity and Access Management (IAM) policies to meticulously restrict and control access to our various data stores.

### 3. **How long do you retain my data?**

At Altimate Inc., we maintain a strict policy of not retaining data related to the requests you make while using our service. The only data we retain is any feedback you may choose to provide us. This feedback is stored for a brief period of 30 days. Its sole purpose is to assist us in quality improvement efforts, allowing us to identify areas where our models can be further refined and enhanced.

---

### **Use of Data for AI Model Training**

### 1. **Do you use my data to train your AI models?**

At Altimate Inc, our primary objective is to provide accurate and efficient documentation using our AI models. However, we do not use any specific client data to train our models. Our models are designed to be tenant-agnostic, meaning they do not learn or differentiate based on individual client data. Any data processed by our service is not repurposed for model training or enhancement.

### 2. **How do you ensure my data isn't unintentionally used for model improvement?**

We employ strict data isolation and access controls. The multi-tenant architecture isolates data on a per-tenant basis, and our internal access controls ensure that only a select group of authorized developers can access the metadata. Coupled with our tenant-agnostic model approach, our infrastructure is designed to prevent any unintentional usage of your data outside its primary purpose.

### 3. **Can I opt-in or opt-out of allowing my data to be used for model training in the future?**

Currently, we do not use client data for model training, so there's no opt-in or opt-out mechanism. If our policy were to change in the future, we would provide users with clear communication and choices regarding the use of their data.

---

We hope the above questions answer your security-related questions. For further questions, please [contact us](https://www.altimate.ai/support)
