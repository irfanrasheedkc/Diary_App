from gradio_client import Client

def emotion_pred(text):
	client = Client("https://ananthujay-sentiment.hf.space/--replicas/x8p5d/")
	result = client.predict(
		text,
		api_name="/predict"
	)
	return result




	


