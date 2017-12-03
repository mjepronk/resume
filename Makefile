all: matthias-pronk-nl.pdf matthias-pronk-en.pdf matthias-pronk-fr.pdf

matthias-pronk-nl.pdf: index.html css/*.css js/*.js
	./html-to-pdf.js index.html#nl $@

matthias-pronk-en.pdf: index.html css/*.css js/*.js
	./html-to-pdf.js index.html#en $@

matthias-pronk-fr.pdf: index.html css/*.css js/*.js
	./html-to-pdf.js index.html#fr $@

clean:
	rm matthias-pronk-??.pdf
