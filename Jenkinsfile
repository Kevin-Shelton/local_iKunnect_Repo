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
   }
}
