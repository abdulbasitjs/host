FROM jenkins/jenkins:lts

USER root

# Install necessary packages
RUN apt-get update && \
    apt-get install -y \
    python3 \
    python3-pip \
    curl \
    apt-transport-https \
    ca-certificates \
    gnupg \
    nodejs \
    npm

# Install Google Cloud SDK
RUN echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] http://packages.cloud.google.com/apt cloud-sdk main" | tee -a /etc/apt/sources.list.d/google-cloud-sdk.list && \
    curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key --keyring /usr/share/keyrings/cloud.google.gpg add - && \
    apt-get update && \
    apt-get install -y google-cloud-sdk

# Install AWS CLI
RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-aarch64.zip" -o "awscliv2.zip" && \
    unzip awscliv2.zip && \
    ./aws/install && \
    rm -rf awscliv2.zip aws

# Install pnpm
RUN npm install -g pnpm

# Switch back to jenkins user
USER jenkins