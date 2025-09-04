# API

## Recipients
### POST /recipients
```bash
curl -X POST $BASE_URL/recipients \
  -H "Content-Type: application/json" \
  -H "X-User-Id: user1" \
  -d '{"fullName":"Alice"}'
```

## Events
### POST /events
```bash
curl -X POST $BASE_URL/events \
  -H "Content-Type: application/json" \
  -H "X-User-Id: user1" \
  -d '{"recipientId":"rec_1","type":"birthday","date":"2024-06-01","budgetEur":50}'
```

## Recommendations
### POST /recommendations/run
```bash
curl -X POST $BASE_URL/recommendations/run \
  -H "Content-Type: application/json" \
  -H "X-User-Id: user1" \
  -d '{"eventId":"evt_1"}'
```

## Orders
### POST /orders/egift
```bash
curl -X POST $BASE_URL/orders/egift \
  -H "Content-Type: application/json" \
  -H "X-User-Id: user1" \
  -d '{"eventId":"evt_1","amountEur":20}'
```
