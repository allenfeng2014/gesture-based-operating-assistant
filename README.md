# gesture-based-operating-assistant
Chrome extension that controls webpage using hand gestures trained by user

Load the folder "build" to your chrome and try the extension yourself !

Source code is in the folder "source", which is not needed for extension loading but for reference purpose.

# Introduction
Before using the extension for the first time, the user should go to options page of the extension. Below is the view of the options page.
![options page](https://user-images.githubusercontent.com/73270294/115515408-f3ad7980-a239-11eb-947e-85c999a6bf17.PNG)
For each functionality the user wants to use, some samples of corresponding hand gesture are needed. The user needs to train the function using "start training" and "stop training" buttons, and put the corresponding hand gesture in front of the camera for some time. "Samples captures" indicates the number of samples it has received during training. There is no requirement on the number of samples needed for each functionality, but I recommend at least 20 samples. The more samples a funtionality get, the more accurate it will be when using the extension. The user can put a nickname for a functionality as a reminder of the corresponding hand gesture.

After training, the extension is ready to run. Click corresponding buttons on the popup page to start and stop the extension. Below is the view of the popup page.

![extension page](https://user-images.githubusercontent.com/73270294/115516578-1db36b80-a23b-11eb-92de-293be3985d39.PNG)
