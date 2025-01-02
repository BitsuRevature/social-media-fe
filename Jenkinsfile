pipeline {
    agent any
    
    environment {
        IMAGE_TAG = 'new-sm-img-22time'
        DOCKER_CREDENTIALS = credentials('docker-credentials')
    }
    
    stages {
        stage('Checkout Code') {
            steps {
                // checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/BitsuRevature/social-media-fe']])
                checkout scm
            }
        }
        
        stage('Build and push docker image') {
            steps {
                script {
                    sh "docker build --platform linux/amd64 -t fe_test .";
                    sh "docker tag fe_test:latest liamfrager/revature-project-2-fe:latest";
                    sh "echo ${DOCKER_CREDENTIALS_PSW}| docker login --username ${DOCKER_CREDENTIALS_USR} --password-stdin"
                    sh "docker push liamfrager/revature-project-2-fe:latest"
                }
            }
        }
    
        stage('Remote into docker runner ec2, pull and run image') {
            steps {
                script {
                    withCredentials([sshUserPrivateKey(credentialsId: 'frontend-ec2-ssh-key', keyFileVariable: 'ssh_private_key', usernameVariable: 'ssh_username')]) {
                        sh 'chmod 600 ${ssh_private_key}'
                        sh '''
                  			    ssh -o StrictHostKeyChecking=no -i ${ssh_private_key} ${ssh_username}@ec2-3-141-29-96.us-east-2.compute.amazonaws.com -y 'docker ps --filter "name=^fe$" --format "{{.Names}}" | grep -q "^fe$" && docker stop fe && docker rm fe || echo "No container named 'fe' is running."'
                  			'''
                        sh 'ssh -o StrictHostKeyChecking=no -i ${ssh_private_key} ${ssh_username}@ec2-3-141-29-96.us-east-2.compute.amazonaws.com -y "docker pull --platform linux/amd64 liamfrager/revature-project-2-fe:latest"'
                        sh 'ssh -o StrictHostKeyChecking=no -i ${ssh_private_key} ${ssh_username}@ec2-3-141-29-96.us-east-2.compute.amazonaws.com -y "docker run --name fe --platform linux/amd64 -p 80:80 -d liamfrager/revature-project-2-fe"'
                    }
                }
            }
        }
    }
}
