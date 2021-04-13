if [ -z "$API_URL" ]; then
  echo API_URL enviroment variable is missing, exiting!
  exit 1
fi

cat <<EOF >/config.json
{
  "apiUrl": "$API_URL",
}
EOF


exec "$@"