pipeline {
    agent any 
   
	 stages {
        stage('Build') {
            steps {
                script {
                        sh """ 
                        npm install
                        npm run build
			"""
                }
            }
        }
		stage('dev-deploy') {
			when {
              expression { env.BRANCH_NAME == 'dev' }
            }
		   steps {
                script {
                        sh """ 
                        scp -o StrictHostKeyChecking=no -r /opt/jenkins-slave/workspace/kunnect-website_dev/dist/konnect-invictus/browser/* root@3.132.139.19:/var/www/html/
                        """
                }
            }
		
		}
		stage('uat-deploy') {
		    when {
              expression { env.BRANCH_NAME == 'uat' }
            }
		   steps {
                script {
                        sh """ 
                        scp -o StrictHostKeyChecking=no -r /opt/jenkins-slave/workspace/kunnect-website_dev/dist/konnect-invictus/browser/* root@52.52.164.82:/var/www/html/
                        """
                }
            }
		
		}
   }
}

