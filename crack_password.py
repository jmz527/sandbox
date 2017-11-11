def crack_password(password):

	passwd = list(password)

	for i in range(0,10):
		for j in range(0,10):
			for k in range(0,10):
				for l in range(0,10):
					if str(i) == passwd[0] and str(j) == passwd[1] and str(k) == passwd[2] and str(l) == passwd[3]:
						mylist=[str(i),str(j),str(k),str(l)]
						code="".join(mylist)

	print("Four Digit Password: {}".format(code))

crack_password(Four Digit Password)