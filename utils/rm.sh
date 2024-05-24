while IFS= read -r container_id; do
    docker rm -f "$container_id"
done < CID
rm -f CID