pipeline {
    agent any
    
    tools {
        nodejs 'node19' 
    }
    
    environment {
        PROJECT_ID = 'hardy-binder-444609-a1'
        BUCKET_NAME = 'abduljs-bucket'
        APP_PATH = 'bo-account-upgrade'
    }
    
    stages {
        stage('Install gcloud SDK') {
            steps {
                sh '''
                    # Create directory for gcloud
                    mkdir -p $HOME/google-cloud-sdk
                    
                    # Download the SDK
                    curl -o $HOME/google-cloud-sdk.tar.gz https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-sdk-424.0.0-linux-x86_64.tar.gz
                    
                    # Extract it to home directory
                    tar -xf $HOME/google-cloud-sdk.tar.gz -C $HOME
                    
                    # Install without prompting
                    $HOME/google-cloud-sdk/install.sh --quiet --install-dir=$HOME
                    
                    # Add to PATH
                    export PATH=$HOME/google-cloud-sdk/bin:$PATH
                    
                    # Verify installation
                    gcloud version
                '''
            }
        }

        stage('Checkout') {
            steps {
                echo 'Checking out code...'
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                sh '''
                    npm install -g pnpm
                    pnpm install
                '''
            }
        }
        
        stage('Build BO App') {
            steps {
                echo 'Building BO Account Upgrade app...'
                sh 'pnpm run build:bo'  
                
                sh '''
                    echo "Build output contents:"
                    ls -la dist/apps/bo-account-upgrade
                '''
            }
        }

        stage('Deploy to GCS') {
            steps {
                withCredentials([file(credentialsId: 'hardy-binder-444609-a1-7452f38cd5be', variable: 'gcp-key')]) {
                    sh """
                        export PATH=\$HOME/google-cloud-sdk/bin:\$PATH
                        gcloud auth activate-service-account --key-file=\$GCP_KEY_FILE
                        gcloud config set project ${PROJECT_ID}
                        gsutil rsync -d -r dist/apps/bo-account-upgrade gs://${BUCKET_NAME}/${APP_PATH}
                    """
                }
            }
        }
    }
    
    post {
        success {
            echo 'Build completed successfully! 🎉'
        }
        failure {
            echo 'Build failed! 😢'
        }
    }
}