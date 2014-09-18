Sample Node.js+MongoDB Beanstalk
================================

This sample demonstrates how to setup continuous integration and deployment for a Node.js+MongoDB project deployed using Amazon Elastic Beanstalk.
Additionally, it shows how to deploy different branches to separate Elastic Beanstalk environments.

Two approaches are available for handling deployment to multiple environments:

1. Use `eb branch` command to associate your current branch with some environment. Then, copy `.elasticbeanstalk/config` file as `config`.
You can also edit `config` file manually. For example, to associate `prod` branch with `sample-nodejs-env-prod`, add the following two
sections to your `config` file:

        [branches]
        prod=sample-nodejs-env-prod

        [branch:prod]
        EnvironmentName=sample-nodejs-env-prod

  Now, whenever `eb push` command is executed while the current branch is `prod`, it will automatically push the designated environment.

2. Pass the environment as `-e` parameter to `eb push` command in your `after_success` block.
You can choose the correct environment based on the value of the Shippable-supplied `BRANCH` variable:

        - >
          if [ $BRANCH = 'prod' ]; then
            ENV='sample-nodejs-env-prod'
          else
            ENV='sample-nodejs-env'
          fi
        - >
          export PATH=$PATH:$EB_TOOLS/eb/linux/python2.7/ && 
            virtualenv ve && 
            source ve/bin/activate && 
            pip install boto==2.14.0 && 
            eb push -e $ENV

For more detailed documentation, please see Shippable's continuous deployment section. http://docs.shippable.com/en/latest/config.html#continuous-deployment

This sample is built for Shippable, a docker based continuous integration and deployment platform.
