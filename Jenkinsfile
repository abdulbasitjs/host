pipeline {
    agent any
    
    tools {
        nodejs 'node19' 
    }
    
    environment {
        PROJECT_ID = 'hardy-binder-444609-a1'
        BUCKET_NAME = 'abduljs-bucket'
        APP_PATH = 'bo-account-upgrade'
        GCP_KEY_FILE = '/var/jenkins_home/gcrbo.json'
        AWS_ACCESS_KEY_ID = 'AKIAQR5EPGLZDKKMCLX5'
        AWS_SECRET_ACCESS_KEY = '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'
        S3_BUCKET_NAME = 'mfe-host-account-upgrade'
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code...'
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                sh 'pnpm install'
            }
        }
        
        stage('Build BO App') {
            steps {
                echo 'Building BO Account Upgrade app...'
                sh 'pnpm run build:bo'  
                sh 'ls -la dist/apps/bo-account-upgrade'
            }
        }


        // stage('Deploy to GCS') {
        //     steps {
        //         sh """
        //             gcloud auth activate-service-account --key-file=${GCP_KEY_FILE}
        //             gcloud config set project ${PROJECT_ID}
        //             gsutil rsync -d -r dist/apps/bo-account-upgrade gs://${BUCKET_NAME}/${APP_PATH}
        //         """
        //     }
        // }

        stage('Deploy to S3') {
            steps {
                sh """
                    export AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
                    export AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}
                    export AWS_REGION=${AWS_REGION}
                    aws s3 sync dist/apps/bo-account-upgrade s3://${S3_BUCKET_NAME}/${APP_PATH} --delete
                """
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