git add *
git commit -m '💻 Upload TIL`s posting'
git push origin main

if [ $? -ne 1 ]; then
    echo 'commit success👌'
fi