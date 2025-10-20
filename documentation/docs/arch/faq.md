The dbt Power User extension is developed and maintained by [Altimate AI](https://www.altimate.ai). We are a software company based in the San Francisco Bay Area and have many large enterprise companies as customers.
We have done many security/governance reviews for these companies and we are SOC 2 Type 2 certified.

Here is our [Privacy Policy](https://www.altimate.ai/privacy) and [Terms of Use](https://www.altimate.ai/terms).

/// admonition | If you need us to do a security review with your IT / security teams, please [contact us](https://www.altimate.ai/support) via chat or Slack.
type: tip
///

### **Security Measures & Protocols**

### 1. **Is my data encrypted during transmission?**

Yes, all data transmitted to and from our service is encrypted using Transport Layer Security (TLS). This ensures that your data remains confidential and cannot be intercepted or tampered with during transmission.

### 2. **How do you prevent unauthorized access to your systems?**

Our systems are designed with multiple layers of security:

- **Transmission**: We use Transport Layer Security (TLS) to encrypt data during transmission.
- **Infrastructure Security**: Our service is hosted on AWS, operating within a Private Virtual Private Cloud (VPC). This provides a secluded environment, significantly reducing intrusion risks.
- **Internal Access Controls**: Only authorized developers have access to our servers. Access rights are managed and restricted using AWS's Role-Based Access Control (RBAC) mechanism.

### 3. **Do you comply with industry security standards (e.g., ISO 27001, SOC 2)?**

We take security and compliance very seriously at Altimate AI, and we have SOC 2 TYPE 2 certification already.

### 4. **Where are your data centers located, and what security measures are in place there?**

Our data centers are managed through Amazon Web Services (AWS), which has facilities in multiple geographic regions around the world. By leveraging AWS, we ensure our users benefit from the rigorous security standards that this leading cloud provider upholds.

### 5. **How are users authenticated and managed?**

Users are authenticated with email and password combinations in the SaaS UI. In the VSCode extension, Python package, users use the API key associated with their account. In the enterprise edition, we provide OAuth authentication as well.

### 6. **Do you have a disaster recovery and business continuity plan?**

Yes, at Altimate AI, we have a robust disaster recovery plan in place. Our data is backed up frequently to ensure minimal data loss. In the event of any system failure, our recovery processes are designed to restore services within an hour. This quick recovery time minimizes disruptions and ensures the continuity of our services for our users.

/// admonition | If you need us to do a security review with your IT/security teams, please [contact us](https://www.altimate.ai/support) via chat or Slack.
type: tip
///

---

### **Data Privacy & Retention**

### 1. **What data do you collect and for what purposes?**

The only data we collect is any feedback you may choose to provide us. This feedback is stored for a brief period of 30 days. Its sole purpose is to assist us in quality improvement efforts, allowing us to identify areas where our models can be further refined and enhanced.

We also collect telemetry data as per VSCode guidelines using telemetry framework offered by VSCode. Telemetry is used for error and usage reporting in order to make the extension better.
You can disable telemetry if needed, as per instructions [here](https://code.visualstudio.com/docs/getstarted/telemetry#_disable-telemetry-reporting).

### 2. **How do you ensure my data privacy?**

At Altimate AI, ensuring the privacy of your data is a top priority. Here's how we uphold it:

- **Data Isolation**: We employ a multi-tenant architecture that inherently isolates data on a per-tenant basis.
- **Strict Access Controls**: Only a select group of authorized developers can access the collected metadata. We employ Amazon Web Services' Identity and Access Management (IAM) policies to meticulously restrict and control access to our various data stores.

### 3. **How long do you retain my data?**

At Altimate AI, we maintain a strict policy of not retaining data related to the requests you make while using our service. The only data we retain is any feedback you may choose to provide us. This feedback is stored for a brief period of 30 days. Its sole purpose is to assist us in quality improvement efforts, allowing us to identify areas where our models can be further refined and enhanced.

### 4. **What's your stance on GDPR?**

We do not store any actual customer data, we only store aggregate statistics and metadata. As a result, GDPR data deletion requests do not need to be propagated to us because we do not store such data.
Our customers typically do not request or require DPAs. However, we're happy to provide a DPA or review a vendor DPA if your organization needs it.

/// admonition | If you need us to do a security review with your IT/security teams, please [contact us](https://www.altimate.ai/support) via chat or Slack.
type: tip
///

### 5. **What is your cookie policy?**

We store only essential cookies, but not to track user data but only to keep few features working as expected. We use only following first party cookies

- **Intercom**: Used for support requests. Cookies stored by Intercom and their cookies policy is defined [here](https://www.intercom.com/help/en/articles/2361922-intercom-messenger-cookies)
- **Supertokens**: Used for SSO authentication and these cookies will be stored only for tenants with SSO. More details on Supertokens cookies policy can be viewed [here](https://supertokens.com/docs/passwordless/common-customizations/sessions/cookie-consent)

---

### **Use of Data for AI Model Training**

### 1. **Do you use my data to train your AI models?**

At Altimate AI, our primary objective is to provide accurate and efficient documentation using our AI models. However, we do not use any specific client data to train our models. Our models are designed to be tenant-agnostic, meaning they do not learn or differentiate based on individual client data. Any data processed by our service is not repurposed for model training or enhancement.

### 2. **How do you ensure my data isn't unintentionally used for model improvement?**

We employ strict data isolation and access controls. The multi-tenant architecture isolates data on a per-tenant basis, and our internal access controls ensure that only a select group of authorized developers can access the metadata. Coupled with our tenant-agnostic model approach, our infrastructure is designed to prevent any unintentional usage of your data outside its primary purpose.

### 3. **Can I opt-in or opt-out of allowing my data to be used for model training in the future?**

Currently, we do not use client data for model training, so there's no opt-in or opt-out mechanism. If our policy were to change in the future, we would provide users with clear communication and choices regarding the use of their data.

/// admonition | If you need us to do a security review with your IT/security teams, please [contact us](https://www.altimate.ai/support) via chat or Slack.
type: tip
///

---

## **What data get sent to the SaaS backend for the preview features?**

### Model Definition

- **Model Name:** The name of the model.
- **Model Schema:** Schema details of the model.
- **Model SQL:** SQL queries related to the model.
- **Adapter Type:** Type of adapter used.

The above model attributes will be referenced in the following feature descriptions

### 1. Documentation Generations

- **Model Attributes:** Refer to the Model Definition.
- **Existing Documentation:** Any existing documentation for the model.
- **Parent Models:** Corresponding parent models associated with the current model.

### 2. SQL to Model

- **SQL:** SQL queries used.
- **Adapter Type:** Type of adapter used (Refer to Model Definition for adapter type details).
- **All Models Present:** List of all models present.
- **All Sources Present:** List of all sources present.

### 3. SQL Explanation

- **SQL:** SQL queries used for explanation.
- **Adapter Type:** Type of adapter used (Refer to Model Definition for adapter type details).

### 4. Column Lineage

- **SQL:** SQL queries related to column lineage.
- **Adapter Type:** Type of adapter used (Refer to Model Definition for adapter type details).
- **Model Attributes:** Refer to the Model Definition.
- **Upstream and Downstream Models Attributes:** Information about all upstream and downstream models. Includes models open in the LINEAGE panel in the extension and additional ones necessary for generating the lineage. (Refer to the model Definition for details about model attributes).

### 5. Defer-to-prod (with saas mode - "DataPilot dbt integration" option)

- **dbt manifest file** In the SaaS mode - when you configure "DataPilot dbt integration", manifest files are uploaded to the SaaS instance.

/// admonition | If you would like to connect your on-premise storage for manifest file uploads, please [contact us](https://www.altimate.ai/support) via chat or Slack.
type: info
///

All of the details can be found in the code [here](https://github.com/AltimateAI/vscode-dbt-power-user/blob/master/src/altimate.ts). Please note that we only send meta-data, such as model schema and queries to the backend. We never send actual data to the backend and we do not store any of the meta-data.

/// admonition | If you need us to do a security review with your IT/security teams, please [contact us](https://www.altimate.ai/support) via chat or Slack.
type: tip
///
